import {
    Entity,
    Property,
    ManyToOne,
    Rel,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  
  @Entity()
  export class Reserva extends BaseEntity {

    @Property({ nullable: false })
    fechaReserva!: string

    @Property({ nullable: false })
    horaInicio!: string

    @Property({ nullable: false })
    horaFin!: string

    @Property({ nullable: false })
    totalReserva!: number

    @Property({ nullable: false })
    idCliente!: number

    @Property({ nullable: false })
    idCancha!: number

    @Property({ nullable: false })
    idEmpleado!: number

  }