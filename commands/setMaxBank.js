// Constants.
const {
  CONFIG_COMMAND_CONSTANTS, MESSAGE_CONSTANTS,
} = require('../constants');

const { SET_MAX_BANK, MAX_BANK_FIELD } = CONFIG_COMMAND_CONSTANTS;
const { MAX_BANK_MESSAGE } = MESSAGE_CONSTANTS;

// Default config value.
const { maxBankAmount } = require('../config/defaultEconomy.json');

// Helpers.
const { ConfigHelper } = require('../helpers');

module.exports = {
  ...SET_MAX_BANK,
  execute(message, [amount]) {
    const value = amount || maxBankAmount;

    ConfigHelper.saveConfig(
      message, MAX_BANK_FIELD, value, MAX_BANK_MESSAGE,
    );
  },
};
