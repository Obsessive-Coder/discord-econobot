const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Transaction.belongsTo(models.TransactionType, {
        foreignKey: {
          field: 'type_id',
          name: 'type',
          allowNull: false,
        },
      });

      models.Transaction.belongsTo(models.User, {
        foreignKey: {
          field: 'user_id',
          name: 'user',
          allowNull: false,
        },
      });

      models.Transaction.belongsTo(models.User, {
        foreignKey: {
          field: 'admin_user_id',
          name: 'adminUser',
          allowNull: false,
        },
      });
    }
  }

  Transaction.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    underscored: true,
  });

  return Transaction;
};
