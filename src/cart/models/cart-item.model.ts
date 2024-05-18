import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
} from 'sequelize-typescript';

import { Cart } from './cart.model';

@Table({ tableName: 'cart_items', timestamps: false, underscored: true })
export class CartItem extends Model {
  @ForeignKey(() => Cart)
  @Column({ type: DataType.UUID, allowNull: false })
  cart_id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  product_id: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  count: number;
}
