import { Request, Response, NextFunction } from 'express'
import { Cancha } from './cancha.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizedCanchaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    estado: req.body.estado,
    canchaClass: req.body.canchaClass,
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
    const canchas = await em.find(
      Cancha,
      {},
      { populate: ['canchaClass'] }
    )
    res.status(200).json({ message: 'found all canchas', data: canchas })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const cancha = await em.findOneOrFail(
      Cancha,
      { id },
      { populate: ['canchaClass'] }
    )
    res.status(200).json({ message: 'found persona', data: cancha })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const cancha = em.create(Cancha, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'cancha created', data: cancha })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const canchaToUpdate = await em.findOneOrFail(Cancha, { id })
    em.assign(canchaToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'cancha updated', data: canchaToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const cancha = em.getReference(Cancha, id)
    await em.removeAndFlush(cancha)
    res
      .status(200)
      .json({ message: 'cancha deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizedCanchaInput, findAll, findOne, add, update, remove }