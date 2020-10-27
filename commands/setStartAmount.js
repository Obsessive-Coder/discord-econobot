// Constants.
const { SET_START_AMOUNT } = require('../constants/configCommands');

// Helpers.
const { CONFIG_HANDLER } = require('../commandHandlers');

module.exports = {
  ...SET_START_AMOUNT,
  execute: (message, [value]) => new CONFIG_HANDLER(message, value, 'startAmount'),
};
