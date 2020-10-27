module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'is_rules_accepted',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
  },

  down: async queryInterface => {
    queryInterface.removeColumn('users', 'is_rules_accepted');
  },
};
