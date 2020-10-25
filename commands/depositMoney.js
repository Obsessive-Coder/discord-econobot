// Constants.
const { DEPOSIT_MONEY } = require('../constants/commands');

// Helpers.
const { TRANSACTION_HELPER } = require('../helpers');

module.exports = {
  ...DEPOSIT_MONEY,
  execute(message, args) {
    TRANSACTION_HELPER.makeTransaction(message, args, 'deposit');
  },
};
