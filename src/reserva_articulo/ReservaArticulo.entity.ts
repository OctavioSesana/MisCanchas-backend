import {
  Entity,
  Property,
  ManyToOne,
  Rel,
  Index,
  Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
//import { ReservaArticuloClass } from "./ReservaArticuloClass.entity.js";

@Entity()
//@Index({ name: "Articulos_de_la_reserva", properties: ["type"] }) // simple index, with custom name
@Unique({ properties: ["idReserva", "idArticulo"] })
export class ReservaArticulo extends BaseEntity {
  @Property({ nullable: false })
  idReserva!: number;

  @Property()
  @Unique()
  idArticulo!: number;

  /* @Index({ name: 'articulos_index' })
    @Property()
    type?: string; */

  // Function to group items by a specific key
  static groupBy<T>(array: T[], keyGetter: (item: T) => any) {
    const map = new Map();
    array.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  // Method to get grouped articles by idReserva
  static getGroupedArticlesByIdReserva(inventory: ReservaArticulo[]) {
    return ReservaArticulo.groupBy(inventory, (item) => item.idReserva);
  }
}
