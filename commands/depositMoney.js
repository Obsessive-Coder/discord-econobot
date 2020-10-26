// Constants.
const { DEPOSIT_MONEY } = require('../constants/commands');

// Helpers.
const { TRANSACTION_HELPER, NEW_TRANSACTION_HELPER } = require('../helpers');

module.exports = {
  ...DEPOSIT_MONEY,
  execute(message, args) {
    // TRANSACTION_HELPER.makeTransaction(message, args, 'deposit');

    const transaction = new NEW_TRANSACTION_HELPER(message, args, 'deposit');

    transaction.makeTransaction();
  },
};
