import { Router } from "express";
import {
  sanitizedPersonaInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from "./persona.controller.js";

export const personaRouter = Router();

personaRouter.get("/", findAll);
personaRouter.get("/:email", findOne);
personaRouter.post("/", sanitizedPersonaInput, add);
personaRouter.put("/:email", sanitizedPersonaInput, update);
personaRouter.patch("/:email", sanitizedPersonaInput, update);
personaRouter.delete("/:id", remove);
