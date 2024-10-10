import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { ReservaArticuloClass } from './ReservaArticuloClass.entity.js'
import { t } from '@mikro-orm/core' 

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const reserva_articuloClass = await em.find(ReservaArticuloClass, {})
    res
      .status(200)
      .json({ message: 'found all types classes', data: reserva_articuloClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const reserva_articuloClass = await em.findOneOrFail(ReservaArticuloClass, { id })
    res
      .status(200)
      .json({ message: 'found types classes', data: reserva_articuloClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const reserva_articuloClass = em.create(ReservaArticuloClass, req.body)
    await em.flush()
    res
      .status(201)
      .json({ message: 'types created', data: reserva_articuloClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const reserva_articuloClass = em.getReference(ReservaArticuloClass, id)
    em.assign(reserva_articuloClass, req.body)
    await em.flush()
    res.status(200).json({ message: 'types class updated' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const reserva_articuloClass = em.getReference(ReservaArticuloClass, id)
    await em.removeAndFlush(reserva_articuloClass)
    res.status(200).send({ message: 'types class deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findAll, findOne, add, update, remove }