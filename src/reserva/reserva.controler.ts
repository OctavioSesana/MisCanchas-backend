import { Request, Response, NextFunction } from 'express'
import { Reserva } from './reserva.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

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
    idCliente: req.body.idCliente,
    idCancha: req.body.idCancha,
    idEmpleado: req.body.idEmpleado,
    idArticulo: req.body.idArticulo,
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const reservas = await em.find(
      Reserva,
      {},
    )
    res.status(200).json({ message: 'found all reservas', data: reservas })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const reserva = await em.findOneOrFail(
      Reserva,
      { id },
    )
    res.status(200).json({ message: 'found reserva', data: reserva })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const reserva = em.create(Reserva, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'reserva created', data: reserva })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const reservaToUpdate = await em.findOneOrFail(Reserva, { id })
    em.assign(reservaToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'reserva updated', data: reservaToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const reserva = em.getReference(Reserva, id)
    await em.removeAndFlush(reserva)
    res
      .status(200)
      .json({ message: 'reserva deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizedReservaInput, findAll, findOne, add, update, remove }