const { MessageEmbed } = require('discord.js');

// Economy variables.
const { currencySymbol } = require('../config/economy.json');

// Constants.
const {
  COMMAND_CONSTANTS, MESSAGE_CONSTANTS, REGEX_CONSTANTS,
} = require('../constants');

// Helpers.
const {
  wallets, MainHelper, UtilityHelper,
} = require('../helpers');

const { GET_BALANCE } = COMMAND_CONSTANTS;
const { USER_MENTION_REGEX } = REGEX_CONSTANTS;
const {
  GET_BALANCE_ERROR_TITLE,
  GET_BALANCE_ERROR_MESSAGE,
  GET_BALANCE_WALLET_TITLE,
  GET_BALANCE__WALLET_MESSAGE,
} = MESSAGE_CONSTANTS;

module.exports = {
  ...GET_BALANCE,
  execute(message, args) {
    const { author, client } = message;

    const accountTypeArg = args.find(arg => !USER_MENTION_REGEX.test(arg));
    const accountType = accountTypeArg === 'bank' ? accountTypeArg : 'wallet';
    const mention = args.find(arg => USER_MENTION_REGEX.test(arg));

    const mentionValue = mention || `<@${author.id}>`;

    const user = MainHelper.getUserFromMention(mentionValue, client);

    let color = 'RED';
    let title = GET_BALANCE_ERROR_TITLE;
    let description = GET_BALANCE_ERROR_MESSAGE;

    if (user) {
      const { id, username } = user;
      const balance = wallets.getBalance(id, accountType);
      const capitalizedAccountType = UtilityHelper
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
