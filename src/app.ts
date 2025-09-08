import express from "express";
import cors from "cors";
import "reflect-metadata";
import { RequestContext } from "@mikro-orm/core";
import { orm, syncSchema } from "./shared/db/orm.js";

// Routers...
import { personaRouter } from "./persona/persona.routes.js";
import { canchaRouter } from "./cancha/canchaRoutes.js";
import { empleadoRouter } from "./empleado/empleado.routes.js";
import { articuloRouter } from "./articulo/articulo.routes.js";
import { reservaRouter } from "./reserva/reserva.routes.js";
import { ReservaArticuloRouter } from "./reserva_articulo/ReservaArticulo.routes.js";
import { loginRouter } from "./login/login.routes.js";

const app = express();

const ALLOWED_ORIGINS = [
  "http://localhost:4200",                     // dev
  "https://mis-canchas-front.netlify.app",     // tu front en Netlify
  "https://mis-canchas.com",                   // dominio real (si algún día lo tenés)
  "https://www.mis-canchas.com",               // dominio real con www
];

// ✅ CORS PRIMERO
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.options("*", cors());

// ✅ Parser
app.use(express.json());

// ✅ MikroORM RequestContext
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

// ✅ Rutas
app.use("/api/persona", personaRouter);
app.use("/api/cancha", canchaRouter);
app.use("/api/empleado", empleadoRouter);
app.use("/api/articulo", articuloRouter);
app.use("/api/reserva", reservaRouter);
app.use("/api/reserva_articulo", ReservaArticuloRouter);
app.use("/api/login", loginRouter);

// ✅ 404
app.use((req, res) => {
  res.status(404).send({ message: "Resource not found" });
});

// ✅ Schema solo si querés
if (process.env.SYNC_SCHEMA === "true") {
  await syncSchema();
}

// ✅ Railway PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send({ message: "API MisCanchas funcionando 🚀" });
});

