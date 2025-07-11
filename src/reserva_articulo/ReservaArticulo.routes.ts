import { Router, Request, Response } from "express";
import { RequestContext } from '@mikro-orm/core';
import { ReservaArticulo } from "./ReservaArticulo.entity";
import { Articulo } from "../articulo/articulo.entity";
import {
  sanitizedReservaArticuloInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from "./ReservaArticulo.controler.js";

export const ReservaArticuloRouter = Router();

ReservaArticuloRouter.get("/", findAll);
ReservaArticuloRouter.get("/:id", findOne);
ReservaArticuloRouter.post("/", sanitizedReservaArticuloInput, add);
ReservaArticuloRouter.put("/:id", sanitizedReservaArticuloInput, update);
ReservaArticuloRouter.patch("/:id", sanitizedReservaArticuloInput, update);
ReservaArticuloRouter.delete("/:id", remove);
