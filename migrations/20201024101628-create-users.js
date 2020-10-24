module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      wallet_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 200,
      },
      bank_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, {
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
