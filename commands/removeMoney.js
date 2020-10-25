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

// Destruct constants.
const { REMOVE_MONEY } = COMMANDS_CONSTANTS;
const { USER_MENTION_REGEX } = REGEX_CONSTANTS;
const {
  REMOVE_MONEY_ERROR_TITLE,
  AMOUNT_ERROR_MESSAGE,
  REMOVE_MONEY_TITLE,
  REMOVE_MONEY_MESSAGE,
  GET_BALANCE_MESSAGE,
  NO_USER_MENTIONED_ERROR_MESSAGE,
} = MESSAGES_CONSTANTS;


module.exports = {
  ...REMOVE_MONEY,
  execute(message, args) {
    const userMention = args.find(arg => USER_MENTION_REGEX.test(arg));
    const amount = UTILITY_HELPER.getArgsAmount(args);

    const messageEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle(REMOVE_MONEY_ERROR_TITLE);

    let isError = false;

    // Error if amount is undefined or not a number.
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      messageEmbed.setDescription(AMOUNT_ERROR_MESSAGE);
      isError = true;
    }

    // Error if no user was mentioned.
    if (!isError && !userMention) {
      messageEmbed.setDescription(NO_USER_MENTIONED_ERROR_MESSAGE);
      isError = true;
    }

    // Remove the amount from the user's balance.
    if (!isError) {
      const { client } = message;
      const accountType = UTILITY_HELPER.getArgsAccountType(args);

      const {
        username,
        id: recipientId,
      } = MAIN_HELPER.getUserFromMention(userMention, client);

      WALLETS.add(recipientId, -amount, accountType);

      const newBalance = WALLETS.getBalance(recipientId, accountType);

      const removeMessage = REMOVE_MONEY_MESSAGE
        .replace('%symbol%', currencySymbol)
        .replace('%amount%', amount)
        .replace('%name%', username)
        .replace('%type%', accountType);

      const currentBalanceMessage = GET_BALANCE_MESSAGE
        .replace('%username%', username)
        .replace('%accountType%', accountType)
        .replace('%currencySymbol%', currencySymbol)
        .replace('%balance%', newBalance);

      messageEmbed
        .setColor('GREEN')
        .setTitle(REMOVE_MONEY_TITLE)
        .setDescription(
          `${removeMessage}\n${currentBalanceMessage}`,
        );
    }

    message.channel.send(messageEmbed);
  },
};
