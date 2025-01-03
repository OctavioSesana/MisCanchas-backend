import {
  Entity,
  Enum,
  Property,
  ManyToOne,
  Rel,
  PrimaryKey,
} from "@mikro-orm/core";
//import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { ArticuloClass } from "./articuloClass.entity.js";

@Entity({
  discriminatorColumn: "type",
  discriminatorMap: { pechera: "Pechera", balon: "Balon" },
})
export abstract class Articulo {
  @PrimaryKey()
  id!: number;

  @Enum()
  type!: "pechera" | "balon";

  @ManyToOne(() => ArticuloClass, { nullable: false })
  articuloClass!: Rel<ArticuloClass>;
}

@Entity()
export class Pechera extends Articulo {
  @Property({ nullable: false })
  color!: string;

  @Property({ nullable: false })
  talle!: string;
}

@Entity()
export class Balon extends Articulo {
  @Property({ nullable: false })
  size!: string;

  @Property({ nullable: false })
  marca!: string;
}
