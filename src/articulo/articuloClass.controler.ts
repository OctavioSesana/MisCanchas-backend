import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { ArticuloClass } from './articuloClass.entity.js'
import { t } from '@mikro-orm/core' 

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const articuloClass = await em.find(ArticuloClass, {})
    res
      .status(200)
      .json({ message: 'found all articulos classes', data: articuloClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const articuloClass = await em.findOneOrFail(ArticuloClass, { id })
    res
      .status(200)
      .json({ message: 'found articulo class', data: articuloClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const articuloClass = em.create(ArticuloClass, req.body)
    await em.flush()
    res
      .status(201)
      .json({ message: 'articulo class created', data: articuloClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const articuloClass = em.getReference(ArticuloClass, id)
    em.assign(articuloClass, req.body)
    await em.flush()
    res.status(200).json({ message: 'articulo class updated' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const articuloClass = em.getReference(ArticuloClass, id)
    await em.removeAndFlush(articuloClass)
    res.status(200).send({ message: 'articulo class deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findAll, findOne, add, update, remove }