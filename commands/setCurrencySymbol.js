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
const { CONFIG_HELPER } = require('../helpers');

module.exports = {
  ...SET_CURRENCY_SYMBOL,
  execute(message, [symbol]) {
    const value = symbol || currencySymbol;

    CONFIG_HELPER.saveConfig(
      message, CURRENCY_SYMBOL_FIELD, value, CURRENCY_SYMBOL_MESSAGE,
    );
  },
};
