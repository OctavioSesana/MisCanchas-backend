import {
    Entity,
    OneToMany,
    Property,
    Cascade,
    Collection,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { Persona } from './persona.entity.js'
  
  @Entity()
  export class PersonaClass extends BaseEntity {

    @Property({ nullable: false, unique: true })
    email!: string

    @Property({ nullable: false, unique: true })
    phone!: number

    @OneToMany(() => Persona, (persona) => persona.personaClass, {
      cascade: [Cascade.ALL],
    })
    
    personas = new Collection<Persona>(this)
  }