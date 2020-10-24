const { MessageEmbed } = require('discord.js');

// Economy variables.
const { currencySymbol } = require('../config/economy.json');

// Constants.
const {
  COMMAND_CONSTANTS, COLLECTION_CONSTANTS,
  MESSAGE_CONSTANTS, REGEX_CONSTANTS
} = require('../constants');

// Helpers.
const { MainHelper, wallets } = require('../helpers');

const { GET_BALANCE } = COMMAND_CONSTANTS;
const { ACCOUNT_TYPES } = COLLECTION_CONSTANTS;
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

    let accountType = 'wallet';
    let mention;

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      if (ACCOUNT_TYPES.includes(arg)) {
        accountType = arg;
      } else if (USER_MENTION_REGEX.test(arg)) {
        mention = arg;
      }
    }

    const mentionValue = mention || `<@${author.id}>`;

    const user = MainHelper.getUserFromMention(mentionValue, client);

    let color = 'RED';
    let title = GET_BALANCE_ERROR_TITLE;
    let description = GET_BALANCE_ERROR_MESSAGE;

    if (user) {
      const { id, username } = user;
      const balance = wallets.getBalance(id, accountType);

      color = 'GREEN';
      title = GET_BALANCE_WALLET_TITLE;
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
