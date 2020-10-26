// Constants.
const { ADD_MONEY } = require('../constants/commands');

// Command handler.
const { ADD_REMOVE_HANDLER } = require('../commandHandlers');

module.exports = {
  ...ADD_MONEY,
  execute: (message, args) => new ADD_REMOVE_HANDLER(message, args, 'add'),
};
