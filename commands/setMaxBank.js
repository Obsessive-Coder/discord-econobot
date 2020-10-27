// Constants.
const { SET_MAX_BANK } = require('../constants/configCommands');

// Helpers.
const { CONFIG_HANDLER } = require('../commandHandlers');

module.exports = {
  ...SET_MAX_BANK,
  execute: (message, [value]) => new CONFIG_HANDLER(message, value, 'maxBankAmount'),
};
