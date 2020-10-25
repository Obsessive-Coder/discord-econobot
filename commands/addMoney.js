// Constants.
const {
  COMMANDS_CONSTANTS, MESSAGES_CONSTANTS,
} = require('../constants');

const { ADD_MONEY } = COMMANDS_CONSTANTS;
const { INVALID_ARGUMENT_ERROR_MESSAGE } = MESSAGES_CONSTANTS;

// Default config value.
const { currencySymbol } = require('../config/defaultEconomy');

// Helpers.
const { Config_Helper } = require('../helpers');

module.exports = {
  ...ADD_MONEY,
  execute(message, args) {
    // console.log(account);
    // console.log(message.mentions.users);
    // console.log(amount);

    const response = 'bar';

    message.channel.send(response);
  },
};
