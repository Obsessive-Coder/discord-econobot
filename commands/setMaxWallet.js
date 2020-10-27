// Constants.
const { SET_MAX_WALLET } = require('../constants/configCommands');

// Helpers.
const { CONFIG_HANDLER } = require('../commandHandlers');

module.exports = {
  ...SET_MAX_WALLET,
  execute: (message, [value]) => new CONFIG_HANDLER(message, value, 'maxWalletAmount'),
};
