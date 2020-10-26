// Constants.
const {
  CONFIG_COMMANDS_CONSTANTS, MESSAGES_CONSTANTS,
} = require('../constants');

const { SET_MAX_BANK, MAX_BANK_FIELD } = CONFIG_COMMANDS_CONSTANTS;
const { MAX_BANK_MESSAGE } = MESSAGES_CONSTANTS;

// Default config value.
const { maxBankAmount } = require('../config/defaultEconomy.json');

// Helpers.
const { CONFIG_HANDLER } = require('../commandHandlers');

module.exports = {
  ...SET_MAX_BANK,
  execute(message, [amount]) {
    const value = amount || maxBankAmount;

    CONFIG_HANDLER.saveConfig(
      message, MAX_BANK_FIELD, value, MAX_BANK_MESSAGE,
    );
  },
};
