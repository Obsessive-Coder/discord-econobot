const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Transactions.init({
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
    },
    transaction_type_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Transactions',
    tableName: 'transactions',
    underscored: true,
  });

  return Transactions;
};
