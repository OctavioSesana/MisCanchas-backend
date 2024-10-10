import {
    Entity,
    OneToMany,
    Property,
    Cascade,
    Collection,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { Cancha } from './cancha.entity.js'
  
  @Entity()
  export class CanchaClass extends BaseEntity {

    @Property({ nullable: false, unique: true })
    precioHora!: number //F5 = 15000 y F7 = 24000

    @Property({ nullable: false, unique: true })
    tipoCancha!: string

    @OneToMany(() => Cancha, (cancha) => cancha.canchaClass, {
      cascade: [Cascade.ALL],
    })
    
    canchas = new Collection<Cancha>(this)
  }