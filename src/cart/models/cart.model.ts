import {
  Table,
  Column,
  PrimaryKey,
  HasMany,
  Model,
  DataType,
} from 'sequelize-typescript';

import { CartItem } from './cart-item.model';

@Table({ tableName: 'carts', timestamps: false, underscored: true })
export class Cart extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  user_id: string;

  @Column({ type: DataType.DATE, allowNull: false })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  updated_at: Date;

  @Column(DataType.ENUM('OPEN', 'ORDERED'))
  status: string;

  @HasMany(() => CartItem)
  items: CartItem[];
}
