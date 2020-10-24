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
        references: {
          model: 'transaction_types',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      admin_user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
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
      modelName: 'Transaction',
      tableName: 'transactions',
      underscored: true,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('transactions');
  },
};
