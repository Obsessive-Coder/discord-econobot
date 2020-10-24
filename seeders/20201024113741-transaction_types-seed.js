const { v4: uuidv4 } = require('uuid');

const definitions = [
  'add money', 'remove money', 'deposit',
  'withdraw', 'transfer money',
];

module.exports = {
  up: async queryInterface => {
    const values = definitions.map(definition => ({
      definition,
      id: uuidv4(),
    }));

    return queryInterface.bulkInsert('transaction_types', values);
  },

  down: async (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    return queryInterface.bulkDelete('transaction_types', {
      definition: { [Op.in]: definitions },
    });
  },
};
