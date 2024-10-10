import { Router } from 'express'
import {
    sanitizedArticuloInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './articulo.controler.js'

export const articuloRouter = Router()

articuloRouter.get('/', findAll)
articuloRouter.get('/:id', findOne)
articuloRouter.post('/', sanitizedArticuloInput, add)
articuloRouter.put('/:id', sanitizedArticuloInput, update)
articuloRouter.patch('/:id', sanitizedArticuloInput, update)
articuloRouter.delete('/:id', remove)
