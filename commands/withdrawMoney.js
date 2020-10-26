// Constants.
const { WITHDRAW_MONEY } = require('../constants/commands');

// Command handler.
const { DEPOSIT_WITHDRAW_HANDLER } = require('../commandHandlers');

module.exports = {
  ...WITHDRAW_MONEY,
  execute: (message, args) => new DEPOSIT_WITHDRAW_HANDLER(message, args, 'withdraw'),
};
