import { v4 as uuidv4 } from 'uuid';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'carts',
      [
        {
          id: 'a146eb53-bab8-4b74-87d6-83ba5a237e1d',
          user_id: uuidv4(),
          status: 'OPEN',
        },
        {
          id: '09502227-00d4-4e51-8ac6-156cc9ac08f8',
          user_id: uuidv4(),
          status: 'ORDERED',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'cart_items',
      [
        {
          id: 'a146eb53-bab8-4b74-87d6-83ba5a237e1a',
          cart_id: 'a146eb53-bab8-4b74-87d6-83ba5a237e1d',
          product_id: 'a146eb53-bab8-4b74-87d6-83ba5a237e1b',
          count: 2,
        },
        {
          id: 'a146eb53-bab8-4b74-87d6-83ba5a237e1b',
          cart_id: 'a146eb53-bab8-4b74-87d6-83ba5a237e1d',
          product_id: 'a146eb53-bab8-4b74-87d6-83ba5a237e1c',
          count: 1,
        },
        {
          id: 'a146eb53-bab8-4b74-87d6-83ba5a237e1c',
          cart_id: '09502227-00d4-4e51-8ac6-156cc9ac08f8',
          product_id: 'a146eb53-bab8-4b74-87d6-83ba5a237e1b',
          count: 3,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('cart_items', null, {});
    await queryInterface.bulkDelete('carts', null, {});
  },
};
