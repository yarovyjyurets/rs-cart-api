import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

const {
  DB_DIALECT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: DB_DIALECT as Dialect,
      host: DB_HOST,
      port: +DB_PORT,
      database: DB_DATABASE,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      autoLoadModels: true,
      synchronize: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
