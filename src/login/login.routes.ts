// src/login/login.routes.ts
import { Router } from 'express';
import { EntityManager } from '@mikro-orm/mysql';
import { RequestContext } from '@mikro-orm/core';
import { Persona } from '../persona/persona.entity.js'; // Ajustá la ruta según dónde esté tu entidad

const router = Router();

router.post('/', async (req, res) => {
  const em = RequestContext.getEntityManager() as EntityManager;
  const { email, password } = req.body;

  try {
    const persona = await em.findOne(Persona, { email, password });

    if (!persona) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    return res.status(200).json(persona);
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
});

export const loginRouter = router;
