import { Router } from 'express'
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './ReservaArticuloClass.controler.js'

export const reserva_articuloClassRouter = Router()

reserva_articuloClassRouter.get('/', findAll)
reserva_articuloClassRouter.get('/:id', findOne)
reserva_articuloClassRouter.post('/', add)
reserva_articuloClassRouter.put('/:id', update)
reserva_articuloClassRouter.delete('/:id', remove)
