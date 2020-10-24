const HELP = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  usage: '[command name]',
};

const ADD_MONEY = {
  name: 'add-money',
  description: 'Add money to a user.',
  isArgsRequired: true,
  requiredArgsCount: 2,
  usage: '[wallet | bank] <member> <amount>',
  cooldown: 5,
};

module.children.HELP = HELP;
module.exports.ADD_MONEY = ADD_MONEY;

module.exports = {
  HELP,
  ADD_MONEY,
};
