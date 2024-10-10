import { Router } from 'express'
import {
  sanitizedPersonaInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './persona.controller.js'

export const personaRouter = Router()

personaRouter.get('/', findAll)
personaRouter.get('/:id', findOne)
personaRouter.post('/', sanitizedPersonaInput, add)
personaRouter.put('/:id', sanitizedPersonaInput, update)
personaRouter.patch('/:id', sanitizedPersonaInput, update)
personaRouter.delete('/:id', remove)
