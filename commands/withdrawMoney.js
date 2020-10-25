// Constants.
const { WITHDRAW_MONEY } = require('../constants/commands');

// Helpers.
const { DEPOSIT_WITHDRAW_HELPER } = require('../helpers');

module.exports = {
  ...WITHDRAW_MONEY,
  execute(message, args) {
    DEPOSIT_WITHDRAW_HELPER.makeTransaction(message, args, 'withdraw');
  },
};
