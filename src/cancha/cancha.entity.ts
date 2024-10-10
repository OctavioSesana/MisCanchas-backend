import {
    Entity,
    Property,
    ManyToOne,
    Rel,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { CanchaClass } from './canchaClass.entity.js'
  
  @Entity()
  export class Cancha extends BaseEntity {
    @Property({ nullable: false })
    estado!: string //reservada o disponible

    @ManyToOne(() => CanchaClass, { nullable: false })
    canchaClass!: Rel<CanchaClass>
  }