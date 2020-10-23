// Constants.
const {
  COMMAND_CONSTANTS, MESSAGE_CONSTANTS,
} = require('../constants');

const { SET_MAX_POCKET, MAX_POCKET_FIELD } = COMMAND_CONSTANTS;
const { MAX_POCKET_MESSAGE } = MESSAGE_CONSTANTS;

// Default config value.
const { maxPocketAmount } = require('../config/defaultEconomy.json');

// Helpers.
const { ConfigHelper } = require('../helpers');

module.exports = {
  ...SET_MAX_POCKET,
  execute(message, [amount]) {
    const value = amount || maxPocketAmount;

    ConfigHelper.saveConfig(
      message, MAX_POCKET_FIELD, value, MAX_POCKET_MESSAGE,
    );
  },
};
