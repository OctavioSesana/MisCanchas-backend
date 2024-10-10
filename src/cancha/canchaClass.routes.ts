import { Router } from 'express'
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './canchaClass.controler.js'

export const canchaClassRouter = Router()

canchaClassRouter.get('/', findAll)
canchaClassRouter.get('/:id', findOne)
canchaClassRouter.post('/', add)
canchaClassRouter.put('/:id', update)
canchaClassRouter.delete('/:id', remove)
