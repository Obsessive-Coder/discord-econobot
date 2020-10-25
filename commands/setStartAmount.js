// Constants.
const {
  CONFIG_COMMANDS_CONSTANTS, MESSAGES_CONSTANTS,
} = require('../constants');

const { SET_START_AMOUNT, START_AMOUNT_FIELD } = CONFIG_COMMANDS_CONSTANTS;
const { START_AMOUNT_MESSAGE } = MESSAGES_CONSTANTS;

// Default config value.
const { startAmount } = require('../config/defaultEconomy.json');

// Helpers.
const { CONFIG_HELPER } = require('../helpers');

module.exports = {
  ...SET_START_AMOUNT,
  execute(message, [amount]) {
    const value = amount || startAmount;

    CONFIG_HELPER.saveConfig(
      message, START_AMOUNT_FIELD, value, START_AMOUNT_MESSAGE,
    );
  },
};
