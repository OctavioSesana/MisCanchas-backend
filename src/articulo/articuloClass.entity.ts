import {
    Entity,
    OneToMany,
    Property,
    Cascade,
    Collection,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { Articulo } from './articulo.entity.js'
  
  @Entity()
  export class ArticuloClass extends BaseEntity {

    @Property({ nullable: false })
    cantDisponible!: number;

    @OneToMany(() => Articulo, (articulo) => articulo.articuloClass, {
      cascade: [Cascade.ALL],
    })
    
    articulos = new Collection<Articulo>(this)
  }