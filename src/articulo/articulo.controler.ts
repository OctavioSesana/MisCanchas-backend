import { Request, Response, NextFunction } from 'express'
import { Articulo } from './articulo.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizedArticuloInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    type: req.body.type,
    articuloClass: req.body.articuloClass,
    color: req.body.color,
    talle: req.body.talle,
    tamaño: req.body.tamaño,
    marca: req.body.marca,
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
    const articulos = await em.find(
      Articulo,
      {},
      { populate: ['articuloClass'] }
    )
    res.status(200).json({ message: 'found all articulos', data: articulos })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const articulo = await em.findOneOrFail(
      Articulo,
      { id },
      { populate: ['articuloClass'] }
    )
    res.status(200).json({ message: 'found persona', data: articulo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const articulo = em.create(Articulo, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'articulo created', data: articulo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const articuloToUpdate = await em.findOneOrFail(Articulo, { id })
    em.assign(articuloToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'articulo updated', data: articuloToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const articulo = em.getReference(Articulo, id)
    await em.removeAndFlush(articulo)
    res
      .status(200)
      .json({ message: 'articulo deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizedArticuloInput, findAll, findOne, add, update, remove }