import { Request, Response, NextFunction } from "express";
import { Reserva } from "./reserva.entity.js";
import { orm } from "../shared/db/orm.js";
import { Articulo } from "../articulo/articulo.entity.js";
import { ReservaArticulo } from "../reserva_articulo/ReservaArticulo.entity.js";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: 
  'APP_USR-8588958575311945-071115-2b4e98e627c531a28461d875e1b52b9f-156701486' });

const em = orm.em;

function sanitizedReservaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    fechaReserva: req.body.fechaReserva,
    horaInicio: req.body.horaInicio,
    horaFin: req.body.horaFin,
    totalReserva: req.body.totalReserva,
    mail_cliente: req.body.mail_cliente,
    idCancha: req.body.idCancha,
    idEmpleado: req.body.idEmpleado,
    idArticulo: req.body.idArticulo,
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}


async function findAll(req: Request, res: Response) {
  try {
    const reservas = await em.find(Reserva, {});
    res.status(200).json({ message: "found all reservas", data: reservas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const mail_cliente = req.params.mail_cliente;
    const reserva = await em.findOneOrFail(Reserva, { mail_cliente });
    res.status(200).json({ message: "found reserva", data: reserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    console.log('REQ BODY BACKEND:', req.body);
    const reserva = em.create(Reserva, req.body.sanitizedInput);
    await em.flush();

    // Configuración de MercadoPago
    // ✅ 2️⃣ Crear preferencia MercadoPago
    const preference = new Preference(client);

    const body = {
      items: [
      {
        id: "reserva-" + reserva.id,
        title: "Reserva de cancha",
        quantity: 1,
        unit_price: reserva.totalReserva * 0.5, // Solo paga el 50%
      },
      ],
      back_urls: {
      success: 'https://www.tusitio.com/pago-exitoso',
      failure: 'https://www.tusitio.com/pago-fallido',
      pending: 'https://www.tusitio.com/pago-pendiente',
      },
      auto_return: 'approved',
    };

    const result = await preference.create({ body });

    // ✅ 3️⃣ Responder con reserva y link
    res.status(201).json({
      message: "reserva created",
      data: reserva,
      init_point: result.init_point,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const mail_cliente = req.params.mail_cliente;
    const reservaToUpdate = await em.findOneOrFail(Reserva, { mail_cliente });
    em.assign(reservaToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: "reserva updated", data: reservaToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);

    // 1️⃣ Buscar la reserva
    const reserva = await em.findOneOrFail(Reserva, id);

    // 2️⃣ Buscar registros en ReservaArticulo relacionados con esta reserva
    const reservaArticulos = await em.find(ReservaArticulo, { idReserva: id });

    // 3️⃣ Para cada registro, actualizar estado de articuloClass y eliminar ReservaArticulo
    for (const ra of reservaArticulos) {
      // Buscar el artículo y traer la relación articuloClass
      const articulo = await em.findOne(Articulo, ra.idArticulo, { populate: ['articuloClass'] });

      if (articulo && articulo.articuloClass) {
        articulo.articuloClass.estado = "Disponible";
        await em.persistAndFlush(articulo.articuloClass);
      }

      // Borrar la relación ReservaArticulo
      await em.removeAndFlush(ra);
    }

    // 4️⃣ Finalmente, eliminar la reserva
    await em.removeAndFlush(reserva);

    res.status(200).json({ message: "Reserva eliminada y artículos liberados" });
  } catch (error: any) {
    console.error("Error al eliminar reserva:", error);
    res.status(500).json({ message: error.message });
  }
}



export { sanitizedReservaInput, findAll, findOne, add, update, remove };
