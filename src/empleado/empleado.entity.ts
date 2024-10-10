import {
    Entity,
    Property,
    ManyToOne,
    Rel,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { EmpleadoClass } from './empleadoClass.entity.js'
  
  @Entity()
  export class Empleado extends BaseEntity {
    @Property({ nullable: false })
    nomyape!: string

    @ManyToOne(() => EmpleadoClass, { nullable: false })
    empleadoClass!: Rel<EmpleadoClass>

    @Property({ nullable: false })
    dni!: number
  }