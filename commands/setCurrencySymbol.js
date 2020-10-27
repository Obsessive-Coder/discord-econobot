// Constants.
const { SET_CURRENCY_SYMBOL } = require('../constants/configCommands');

// Helpers.
const { CONFIG_HANDLER } = require('../commandHandlers');

module.exports = {
  ...SET_CURRENCY_SYMBOL,
  execute: (message, [value]) => new CONFIG_HANDLER(message, value, 'currencySymbol'),
};
