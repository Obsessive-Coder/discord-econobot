// Constants.
const { WITHDRAW_MONEY } = require('../constants/commands');

// Helpers.
const { TRANSACTION_HELPER } = require('../helpers');

module.exports = {
  ...WITHDRAW_MONEY,
  execute(message, args) {
    TRANSACTION_HELPER.makeTransaction(message, args, 'withdraw');
  },
};
