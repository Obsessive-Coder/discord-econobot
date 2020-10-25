const variables = {
  CURRENCY_SYMBOL_MESSAGE: 'Currency symbol set to:',
  START_AMOUNT_MESSAGE: 'Start amount set to:',
  MAX_WALLET_MESSAGE: 'Max wallet amount set to:',
  MAX_BANK_MESSAGE: 'Max bank amount set to:',
  NAN_ERROR_MESSAGE: 'Amount must be a number',
  INVALID_ARGUMENT_ERROR_MESSAGE: 'Invalid or missing argument(s)',
  USAGE_ERROR_MESSAGE: 'The proper usage would be:',
  COOLDOWN_MESSAGE:
    'please wait %timeLeft% more second(s) before reusing the `%name%` command.',
  ALL_HELP_TITLE: 'Here\'s a list of all my commands:',
  ALL_HELP_DESCRIPTION:
    '\nYou can send `%prefix%help [command name]` to get info on a specific command!',
  INVALID_COMMAND_MESSAGE: 'That\'s not a valid command.',
  UNABLE_TO_DM_MESSAGE: 'it seems like I can\'t DM you! Do you have DMs disabled?',
  SUCCESS_HELP_MESSAGE: 'I\'ve sent you a DM with the requested command(s)',
  GET_BALANCE_ERROR_TITLE: 'Unknown User',
  GET_BALANCE_ERROR_MESSAGE: 'That user was not found. Please try again',
  GET_BALANCE_WALLET_TITLE: 'User %accountType% Balance',
  GET_BALANCE__WALLET_MESSAGE:
    '%username%\'s %accountType% balance is %currencySymbol%%balance%',
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
