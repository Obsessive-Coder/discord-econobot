// Constants.
const {
  CONFIG_COMMANDS_CONSTANTS, MESSAGES_CONSTANTS,
} = require('../constants');

const {
  SET_CURRENCY_SYMBOL, CURRENCY_SYMBOL_FIELD,
} = CONFIG_COMMANDS_CONSTANTS;
const { CURRENCY_SYMBOL_MESSAGE } = MESSAGES_CONSTANTS;

// Default config value.
const { currencySymbol } = require('../config/defaultEconomy.json');

// Helpers.
const { CONFIG_HANDLER } = require('../commandHandlers');

module.exports = {
  ...SET_CURRENCY_SYMBOL,
  execute(message, [symbol]) {
    const value = symbol || currencySymbol;

    CONFIG_HANDLER.saveConfig(
      message, CURRENCY_SYMBOL_FIELD, value, CURRENCY_SYMBOL_MESSAGE,
    );
  },
};
