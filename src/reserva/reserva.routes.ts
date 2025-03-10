import { Router } from "express";
import {
  sanitizedReservaInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from "./reserva.controler.js";

export const reservaRouter = Router();

reservaRouter.get("/", findAll);
reservaRouter.get("/:mail_cliente", findOne);
reservaRouter.post("/", sanitizedReservaInput, add);
reservaRouter.put("/:mail_cliente", sanitizedReservaInput, update);
reservaRouter.patch("/:mail_cliente", sanitizedReservaInput, update);
reservaRouter.delete("/:id", remove);
