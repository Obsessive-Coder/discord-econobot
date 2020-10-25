// Constants.
const {
  CONFIG_COMMANDS_CONSTANTS, MESSAGES_CONSTANTS,
} = require('../constants');

const { SET_MAX_WALLET, MAX_WALLET_FIELD } = CONFIG_COMMANDS_CONSTANTS;
const { MAX_WALLET_MESSAGE } = MESSAGES_CONSTANTS;

// Default config value.
const { maxWalletAmount } = require('../config/defaultEconomy.json');

// Helpers.
const { CONFIG_HELPER } = require('../helpers');

module.exports = {
  ...SET_MAX_WALLET,
  execute(message, [amount]) {
    const value = amount || maxWalletAmount;

    CONFIG_HELPER.saveConfig(
      message, MAX_WALLET_FIELD, value, MAX_WALLET_MESSAGE,
    );
  },
};
