// Constants.
const {
  COMMAND_CONSTANTS, MESSAGE_CONSTANTS,
} = require('../constants');

const { ADD_MONEY } = COMMAND_CONSTANTS;
const { INVALID_ARGUMENT_ERROR_MESSAGE } = MESSAGE_CONSTANTS;

// Default config value.
const { currencySymbol } = require('../config/defaultEconomy.json');

// Helpers.
const { ConfigHelper } = require('../helpers');

module.exports = {
  ...ADD_MONEY,
  execute(message, args) {
    // console.log(account);
    // console.log(message.mentions.users);
    // console.log(amount);

    let response = 'bar';
    if (args.length !== 2) {
      response = INVALID_ARGUMENT_ERROR_MESSAGE;
    }

    message.channel.send(response);
  },
};
