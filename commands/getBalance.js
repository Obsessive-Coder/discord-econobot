const { MessageEmbed } = require('discord.js');

// Economy variables.
const { currencySymbol } = require('../config/economy.json');

// Constants.
const {
  COMMANDS_CONSTANTS, MESSAGES_CONSTANTS, REGEX_CONSTANTS,
} = require('../constants');

// Helpers.
const {
  WALLETS, MAIN_HELPER, UTILITY_HELPER,
} = require('../helpers');

const { GET_BALANCE } = COMMANDS_CONSTANTS;
const { USER_MENTION_REGEX } = REGEX_CONSTANTS;
const {
  GET_BALANCE_ERROR_TITLE,
  GET_BALANCE_ERROR_MESSAGE,
  GET_BALANCE_WALLET_TITLE,
  GET_BALANCE__WALLET_MESSAGE,
} = MESSAGES_CONSTANTS;

module.exports = {
  ...GET_BALANCE,
  execute(message, args) {
    const { author, client } = message;

    const accountTypeArg = args.find(arg => !USER_MENTION_REGEX.test(arg));
    const accountType = accountTypeArg === 'bank' ? accountTypeArg : 'wallet';
    const mention = args.find(arg => USER_MENTION_REGEX.test(arg));

    const mentionValue = mention || `<@${author.id}>`;

    const user = MAIN_HELPER.getUserFromMention(mentionValue, client);

    let color = 'RED';
    let title = GET_BALANCE_ERROR_TITLE;
    let description = GET_BALANCE_ERROR_MESSAGE;

    if (user) {
      const { id, username } = user;
      const balance = WALLETS.getBalance(id, accountType);
      const capitalizedAccountType = UTILITY_HELPER
        .getCapitalizedString(accountType);

      color = 'GREEN';
      title = GET_BALANCE_WALLET_TITLE
        .replace('%accountType%', capitalizedAccountType);

      description = GET_BALANCE__WALLET_MESSAGE
        .replace('%username%', username)
        .replace('%accountType%', accountType)
        .replace('%currencySymbol%', currencySymbol)
        .replace('%balance%', balance);
    }

    const messageEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setDescription(description);

    message.channel.send(messageEmbed);
  },
};
