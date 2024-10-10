import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { EmpleadoClass } from './empleadoClass.entity.js'
import { t } from '@mikro-orm/core' 
import { Empleado } from './empleado.entity.js'

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const empleadoClass = await em.find(EmpleadoClass, {})
    res
      .status(200)
      .json({ message: 'found all empleado classes', data: empleadoClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const empleadoClass = await em.findOneOrFail(EmpleadoClass, { id })
    res
      .status(200)
      .json({ message: 'found empleado class', data: empleadoClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const empleadoClass = em.create(EmpleadoClass, req.body)
    await em.flush()
    res
      .status(201)
      .json({ message: 'empleado class created', data: empleadoClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const empleadoClass = em.getReference(EmpleadoClass, id)
    em.assign(empleadoClass, req.body)
    await em.flush()
    res.status(200).json({ message: 'empleado class updated' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const empleadoClass = em.getReference(EmpleadoClass, id)
    await em.removeAndFlush(empleadoClass)
    res.status(200).send({ message: 'empleado class deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findAll, findOne, add, update, remove }