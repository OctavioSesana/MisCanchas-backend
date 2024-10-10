import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { PersonaClass } from './personaClass.entity.js'
import { t } from '@mikro-orm/core' 

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const personaClass = await em.find(PersonaClass, {})
    res
      .status(200)
      .json({ message: 'found all persona classes', data: personaClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const personaClass = await em.findOneOrFail(PersonaClass, { id })
    res
      .status(200)
      .json({ message: 'found persona class', data: personaClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const personaClass = em.create(PersonaClass, req.body)
    await em.flush()
    res
      .status(201)
      .json({ message: 'persona class created', data: personaClass })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const personaClass = em.getReference(PersonaClass, id)
    em.assign(personaClass, req.body)
    await em.flush()
    res.status(200).json({ message: 'persona class updated' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const personaClass = em.getReference(PersonaClass, id)
    await em.removeAndFlush(personaClass)
    res.status(200).send({ message: 'persona class deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findAll, findOne, add, update, remove }