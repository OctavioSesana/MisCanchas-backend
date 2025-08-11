import "reflect-metadata";
import express from "express";
import cors from "cors";
import { personaRouter } from "./persona/persona.routes.js";
import { orm, syncSchema } from "./shared/db/orm.js";
import { RequestContext } from "@mikro-orm/core";
//import { personaClassRouter } from "./persona/personaClass.routes.js";
import { canchaRouter } from "./cancha/canchaRoutes.js";
import { empleadoClassRouter } from "./empleado/empleadoClass.routes.js";
import { empleadoRouter } from "./empleado/empleado.routes.js";
import { articuloRouter } from "./articulo/articulo.routes.js";
import { reservaRouter } from "./reserva/reserva.routes.js";
//import { reserva_articuloClassRouter } from "./reserva_articulo/ReservaArticuloClass.routes.js";
import { ReservaArticuloRouter } from "./reserva_articulo/ReservaArticulo.routes.js";
import bodyParser from 'body-parser'; // o directamente express.json()
import { loginRouter } from './login/login.routes.js';

const app = express();

app.use(bodyParser.json()); // o app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(express.json());

//luego de los middlewares base
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});
//antes de las rutas y middlewares de negocio

// app.use("/api/persona/classes", personaClassRouter);
app.use("/api/persona", personaRouter);
app.use("/api/cancha", canchaRouter);
app.use("/api/empleado/classes", empleadoClassRouter);
app.use("/api/empleado", empleadoRouter);
app.use("/api/articulo", articuloRouter);
app.use("/api/reserva", reservaRouter);
//app.use("/api/reserva_articulo/classes", reserva_articuloClassRouter);
app.use("/api/reserva_articulo", ReservaArticuloRouter);
app.use("/api/login", loginRouter);

app.use((req, res, next) => {
  res.status(404).send({ message: "Resource not found" });
});



await syncSchema(); //never in production

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
