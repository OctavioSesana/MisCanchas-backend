import { Router } from 'express'
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './empleadoClass.controler.js'

export const empleadoClassRouter = Router()

empleadoClassRouter.get('/', findAll)
empleadoClassRouter.get('/:id', findOne)
empleadoClassRouter.post('/', add)
empleadoClassRouter.put('/:id', update)
empleadoClassRouter.delete('/:id', remove)
