import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartModel: typeof Cart) {}

  findByUserId(userId: string): Promise<Cart> {
    return this.cartModel.findOne({
      where: {
        user_id: userId,
      },
    });
  }

  createByUserId(userId: string): Promise<Cart> {
    return this.cartModel.create({
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      status: 'OPEN',
      items: [],
    });
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    return await this.cartModel.update(
      {
        items: [...items],
      },
      {
        where: {
          user_id: userId,
        },
        returning: true,
      },
    )[1].dataValues;
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartModel.destroy({
      where: {
        user_id: userId,
      },
    });
  }
}
