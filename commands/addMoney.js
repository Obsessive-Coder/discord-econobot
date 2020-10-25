// Constants.
const { COMMANDS_CONSTANTS } = require('../constants');

// Helpers.
const { TRANSACTION_HELPER } = require('../helpers');

// Destruct constants.
const { ADD_MONEY } = COMMANDS_CONSTANTS;

module.exports = {
  ...ADD_MONEY,
  execute(message, args) {
    TRANSACTION_HELPER.makeTransaction(message, args, 'add');
  },
};
