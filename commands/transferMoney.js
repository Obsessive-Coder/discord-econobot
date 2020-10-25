// Constants.
const { COMMANDS_CONSTANTS } = require('../constants');

// Helpers.
const { TRANSACTION_HELPER } = require('../helpers');

// Destruct constants.
const { TRANSFER_MONEY } = COMMANDS_CONSTANTS;

module.exports = {
  ...TRANSFER_MONEY,
  execute(message, args) {
    TRANSACTION_HELPER.makeTransaction(message, args, 'transfer');
  },
};
