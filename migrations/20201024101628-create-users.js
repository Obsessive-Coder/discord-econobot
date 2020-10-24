module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
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
      modelName: 'Users',
      tableName: 'users',
      underscored: true,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
