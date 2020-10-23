// Constants.
const {
  COMMAND_CONSTANTS, MESSAGE_CONSTANTS,
} = require('../constants');

const { SET_START_AMOUNT, START_AMOUNT_FIELD } = COMMAND_CONSTANTS;
const { START_AMOUNT_MESSAGE } = MESSAGE_CONSTANTS;

// Default config value.
const { startAmount } = require('../config/defaultEconomy.json');

// Helpers.
const { ConfigHelper } = require('../helpers');

module.exports = {
  ...SET_START_AMOUNT,
  execute(message, [amount]) {
    const value = amount || startAmount;

    ConfigHelper.saveConfig(
      message, START_AMOUNT_FIELD, value, START_AMOUNT_MESSAGE,
    );
  },
};
