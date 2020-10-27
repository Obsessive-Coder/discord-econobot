const variables = {
  CURRENCY_SYMBOL_MESSAGE: 'Currency symbol set to:',
  START_AMOUNT_MESSAGE: 'Start amount set to:',
  MAX_WALLET_MESSAGE: 'Max wallet amount set to:',
  MAX_BANK_MESSAGE: 'Max bank amount set to:',
  CONFIG_SET_TITLE: 'Set %type%',
  CONFIG_SET_MESSAGE: '%type% set to:',
  NAN_ERROR_MESSAGE: 'Amount must be a number',
  INVALID_ARGUMENT_ERROR_MESSAGE: 'Invalid or missing argument(s)',
  USAGE_ERROR_MESSAGE: 'The proper usage would be:',
  COOLDOWN_MESSAGE:
    'please wait %timeLeft% more second(s) before reusing the `%name%` command.',
  ALL_HELP_TITLE: 'Here\'s a list of all my commands:',
  HELP_LEGEND: '\n**LEGEND**\n%prefix% - Command Prefix\n[] - Optional Argument\n<> - Required Argument\n<option1 | option2> - choose one of these arguments\n **Do not included brackets**',
  HELP_EXAMPLE: '\nExample - `%prefix%deposit-money 750 bank`',
  ALL_HELP_DESCRIPTION:
    '\nYou can send `%prefix%help [command name]` to get info on a specific command!',
  INVALID_COMMAND_MESSAGE: 'That\'s not a valid command.',
  UNABLE_TO_DM_MESSAGE: 'it seems like I can\'t DM you! Do you have DMs disabled?',
  SUCCESS_HELP_MESSAGE: 'I\'ve sent you a DM with the requested command(s)',
  GET_BALANCE_ERROR_TITLE: 'Unknown User',
  GET_BALANCE_ERROR_MESSAGE: 'That user was not found. Please try again',
  GET_BALANCE_TITLE: 'User %accountType% Balance',
  BALANCE_MESSAGE: '%name%\'s %type% balance is %symbol%%balance%',
  LEADERBOARD_TITLE: '%type% Funds Leaderboard',
  UNKNOWN_COMMAND_ERROR_MESSAGE: '`%prefix%%command%` is an unknown command.',
  DB_SYNC_ERROR_MESSAGE: 'Something went wrong with syncing the database.',
  TRANSACTION_ERROR_TITLE: 'Transaction Error',
  TRANSACTION_TITLE: '%transaction% Money',
  TRANSACTION_MESSAGE:
    'Successfully %transaction% %symbol%%amount% %toFrom% %name% %type%.',
  INSUFFICIENT_FUNDS_ERROR_MESSAGE:
    'Insufficient funds. You only have %balance% in your %account%.',
  AMOUNT_ERROR_MESSAGE: 'Amount must be a number greater than 0.',
  NO_USER_MENTIONED_ERROR_MESSAGE: 'No user was mentioned.',
  INVALID_ROLE_MESSAGE:
    'You do not have the correct role to make this command.\nSpeak to an admin to get access to the `%role%` role.',
  CONFIG_ERROR_TITLE: 'Config Error',
  WELCOME_TITLE: 'Welcome to %server%',
  WELCOME_MESSAGE: 'Welcome to the server, %user%. Please go to the %channel% channel and read the rules. Afterwards give the rules a reaction to let us know that you read them. Once you do this you will be given access to the rest of the channels and a $200 starting bonus!',
};

// Export each individually.
Object.keys(variables).forEach(key => {
  module.exports[key] = variables[key];
});

module.exports = variables;
