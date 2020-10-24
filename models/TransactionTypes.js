const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransactionTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  TransactionTypes.init({
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
    },
    definition: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'TransactionTypes',
    tableName: 'transaction_types',
    timestamps: false,
  });

  return TransactionTypes;
};
