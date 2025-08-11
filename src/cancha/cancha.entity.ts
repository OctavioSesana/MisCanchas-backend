import {
    Entity,
    Property,
    ManyToOne,
    Rel,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
    
  @Entity()
  export class Cancha extends BaseEntity {
    @Property({ nullable: false })
    estado!: string //reservada o disponible

    @Property({ nullable: false })
    precioHora!: number; //F5 = 15000 y F7 = 24000

    @Property({ nullable: false })
    tipoCancha!: string;
  }