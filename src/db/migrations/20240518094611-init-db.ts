import { QueryInterface, DataTypes, literal, fn } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    );
    await queryInterface.createTable('carts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: literal('uuid_generate_v4()'),
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      status: {
        type: Sequelize.ENUM('OPEN', 'ORDERED'),
        allowNull: false,
        defaultValue: 'OPEN',
      },
    });

    await queryInterface.createTable('cart_items', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: literal('uuid_generate_v4()'),
      },
      cart_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id',
        },
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('cart_items');
    await queryInterface.dropTable('carts');
  },
};
