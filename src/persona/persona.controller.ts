import { Request, Response, NextFunction } from "express";
import { Persona } from "./persona.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;

function sanitizedPersonaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    name: req.body.name,
    lastname: req.body.lastname,
    dni: req.body.dni,
    phone: req.body.phone,
    email: req.body.email,
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const personas = await em.find(
      Persona,
      {},
      {
        /*populate: ['personaClass']  */
      }
    );
    res.status(200).json({ message: "found all personas", data: personas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const email = req.params.email;
    const persona = await em.findOneOrFail(
      Persona,
      { email }
      //{ populate: ['personaClass'] }
    );
    res.status(200).json({ message: "found persona", data: persona });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const persona = em.create(Persona, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: "persona created", data: persona });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const email = req.params.email;
    const personaToUpdate = await em.findOneOrFail(Persona, { email });
    em.assign(personaToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: "persona updated", data: personaToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const persona = em.getReference(Persona, id);
    await em.removeAndFlush(persona);
    res.status(200).json({ message: "persona deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedPersonaInput, findAll, findOne, add, update, remove };
