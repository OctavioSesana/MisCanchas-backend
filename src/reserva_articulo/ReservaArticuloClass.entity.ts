import {
    Entity,
    OneToMany,
    Property,
    Cascade,
    Collection,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { ReservaArticulo } from './ReservaArticulo.entity.js'

  
  @Entity()
  export class ReservaArticuloClass extends BaseEntity {
    
    @OneToMany(() => ReservaArticulo , (reserva_articulo) => reserva_articulo.reserva_articuloClass, {
      cascade: [Cascade.ALL],
    })
    
    reservas_articulos = new Collection<ReservaArticulo>(this)
  }