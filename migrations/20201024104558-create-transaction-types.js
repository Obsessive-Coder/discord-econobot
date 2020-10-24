module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaction_types', {
      id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
      },
      definition: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      modelName: 'TransactionType',
      tableName: 'transaction_types',
      timestamps: false,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('transaction_types');
  },
};
