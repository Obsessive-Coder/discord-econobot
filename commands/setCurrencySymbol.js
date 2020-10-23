// Constants.
const {
  CONFIG_COMMAND_CONSTANTS, MESSAGE_CONSTANTS,
} = require('../constants');

const { SET_CURRENCY_SYMBOL, CURRENCY_SYMBOL_FIELD } = CONFIG_COMMAND_CONSTANTS;
const { CURRENCY_SYMBOL_MESSAGE } = MESSAGE_CONSTANTS;

// Default config value.
const { currencySymbol } = require('../config/defaultEconomy.json');

// Helpers.
const { ConfigHelper } = require('../helpers');

module.exports = {
  ...SET_CURRENCY_SYMBOL,
  execute(message, [symbol]) {
    const value = symbol || currencySymbol;

    ConfigHelper.saveConfig(
      message, CURRENCY_SYMBOL_FIELD, value, CURRENCY_SYMBOL_MESSAGE,
    );
  },
};
