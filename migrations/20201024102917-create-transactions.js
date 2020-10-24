module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
      },
      transaction_type_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        validate: {
          isUUID: 4,
        },
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin_user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      modelName: 'Transactions',
      tableName: 'transactions',
      underscored: true,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('transactions');
  },
};
