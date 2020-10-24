// Constants.
const {
  CONFIG_COMMAND_CONSTANTS, MESSAGE_CONSTANTS,
} = require('../constants');

const { SET_MAX_WALLET, MAX_WALLET_FIELD } = CONFIG_COMMAND_CONSTANTS;
const { MAX_WALLET_MESSAGE } = MESSAGE_CONSTANTS;

// Default config value.
const { maxWalletAmount } = require('../config/defaultEconomy.json');

// Helpers.
const { ConfigHelper } = require('../helpers');

module.exports = {
  ...SET_MAX_WALLET,
  execute(message, [amount]) {
    const value = amount || maxWalletAmount;

    ConfigHelper.saveConfig(
      message, MAX_WALLET_FIELD, value, MAX_WALLET_MESSAGE,
    );
  },
};
