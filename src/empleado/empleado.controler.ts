import { Request, Response, NextFunction } from 'express'
import { Empleado } from './empleado.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizedEmpleadoInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nomyape: req.body.nomyape,
    dni: req.body.dni,
    empleadoClass: req.body.empleadoClass,
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
    const empleados = await em.find(
      Empleado,
      {},
      { populate: ['empleadoClass'] }
    )
    res.status(200).json({ message: 'found all empleados', data: empleados })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const empleado = await em.findOneOrFail(
      Empleado,
      { id },
      { populate: ['empleadoClass'] }
    )
    res.status(200).json({ message: 'found empleado', data: empleado })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const empleado = em.create(Empleado, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'empleado created', data: empleado })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const empleadoToUpdate = await em.findOneOrFail(Empleado, { id })
    em.assign(empleadoToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'empleado updated', data: empleadoToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const empleado = em.getReference(Empleado, id)
    await em.removeAndFlush(empleado)
    res
      .status(200)
      .json({ message: 'empleado deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizedEmpleadoInput, findAll, findOne, add, update, remove }