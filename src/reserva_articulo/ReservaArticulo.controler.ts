import { Request, Response, NextFunction } from 'express'
import { ReservaArticulo } from './ReservaArticulo.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizedReservaArticuloInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    idReserva: req.body.idReserva,
    idArticulo: req.body.idArticulo,
    type: req.body.type,
    reserva_articuloClass: req.body.reserva_articuloClass,
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
    const reservas_articulos = await em.find(
      ReservaArticulo,
      {},
      { populate: ['reserva_articuloClass'] }
    )
    res.status(200).json({ message: 'found all types', data: reservas_articulos })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const reserva_articulo = await em.findOneOrFail(
        ReservaArticulo,
      { id },
      { populate: ['reserva_articuloClass'] }
    )
    res.status(200).json({ message: 'found type', data: reserva_articulo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const reserva_articulo = em.create(ReservaArticulo, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'type created', data: reserva_articulo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const reserva_articuloToUpdate = await em.findOneOrFail(ReservaArticulo, { id })
    em.assign(reserva_articuloToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'type updated', data: reserva_articuloToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const reserva_articulo = em.getReference(ReservaArticulo, id)
    await em.removeAndFlush(reserva_articulo)
    res
      .status(200)
      .json({ message: 'type deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizedReservaArticuloInput, findAll, findOne, add, update, remove }