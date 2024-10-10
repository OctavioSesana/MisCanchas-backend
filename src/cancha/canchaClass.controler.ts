import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { CanchaClass } from './canchaClass.entity.js'
import { t } from '@mikro-orm/core' 

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const canchaClass = await em.find(CanchaClass, {})
    res
      .status(200)
      .json({ message: 'found all cancha classes', data: canchaClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const canchaClass = await em.findOneOrFail(CanchaClass, { id })
    res
      .status(200)
      .json({ message: 'found cancha class', data: canchaClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const canchaClass = em.create(CanchaClass, req.body)
    await em.flush()
    res
      .status(201)
      .json({ message: 'cancha class created', data: canchaClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const canchaClass = em.getReference(CanchaClass, id)
    em.assign(canchaClass, req.body)
    await em.flush()
    res.status(200).json({ message: 'cancha class updated' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const canchaClass = em.getReference(CanchaClass, id)
    await em.removeAndFlush(canchaClass)
    res.status(200).send({ message: 'cancha class deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findAll, findOne, add, update, remove }