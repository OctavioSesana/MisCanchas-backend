import { Router } from 'express'
import {
    sanitizedEmpleadoInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './empleado.controler.js'

export const empleadoRouter = Router()

empleadoRouter.get('/', findAll)
empleadoRouter.get('/:id', findOne)
empleadoRouter.post('/', sanitizedEmpleadoInput, add)
empleadoRouter.put('/:id', sanitizedEmpleadoInput, update)
empleadoRouter.patch('/:id', sanitizedEmpleadoInput, update)
empleadoRouter.delete('/:id', remove)
