import { Router } from 'express'
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './articuloClass.controler.js'

export const articuloClassRouter = Router()

articuloClassRouter.get('/', findAll)
articuloClassRouter.get('/:id', findOne)
articuloClassRouter.post('/', add)
articuloClassRouter.put('/:id', update)
articuloClassRouter.delete('/:id', remove)
