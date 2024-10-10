import {
    Entity,
    OneToMany,
    Property,
    Cascade,
    Collection,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { Empleado } from './empleado.entity.js'
  
  @Entity()
  export class EmpleadoClass extends BaseEntity {
    @Property({ nullable: false, unique: true })
    sueldoSemanal!: number

    @Property({ nullable: false, unique: true })
    estado!: string // Disponible, Ocupado

    @OneToMany(() => Empleado, (empleado) => empleado.empleadoClass, {
      cascade: [Cascade.ALL],
    })
    
    empleados = new Collection<Empleado>(this)
  }