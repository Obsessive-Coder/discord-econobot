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
const { TRANSFER_MONEY } = COMMANDS_CONSTANTS;
const { USER_MENTION_REGEX } = REGEX_CONSTANTS;
const {
  TRANSFER_ERROR_TITLE,
  TRANSFER_AMOUNT_ERROR_MESSAGE,
  TRANSFER_INSUFFICIENT_FUNDS_ERROR_MESSAGE,
  TRANSFER_TITLE,
  TRANSFER_MESSAGE,
  GET_BALANCE_MESSAGE,
  NO_USER_MENTIONED_ERROR_MESSAGE,
} = MESSAGES_CONSTANTS;

module.exports = {
  ...TRANSFER_MONEY,
  execute(message, args) {
    const {
      client,
      author: {
        id: authorId,
        username: senderName,
      },
    } = message;

    const transferMention = args.find(arg => USER_MENTION_REGEX.test(arg));
    const accountType = UTILITY_HELPER.getArgsAccountType(args);
    const currentBalance = WALLETS.getBalance(authorId, accountType);
    const isTransferAll = args.includes('all');
    const transferAmount = isTransferAll
      ? currentBalance : UTILITY_HELPER.getArgsAmount(args);

    const messageEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle(TRANSFER_ERROR_TITLE);

    let isError = false;

    // Error if amount is undefined or not a number.
    if (!transferAmount || Number.isNaN(transferAmount) || transferAmount <= 0) {
      messageEmbed.setDescription(TRANSFER_AMOUNT_ERROR_MESSAGE);
      isError = true;
    }

    // Error if the user doesn't have enough money.
    if (!isError && transferAmount > currentBalance) {
      messageEmbed.setDescription(
        TRANSFER_INSUFFICIENT_FUNDS_ERROR_MESSAGE
          .replace('%balance%', currentBalance),
      );

      isError = true;
    }

    // Error if no other use was mentioned.
    if (!isError && !transferMention) {
      messageEmbed.setDescription(NO_USER_MENTIONED_ERROR_MESSAGE);

      isError = true;
    }

    // Transfer the money.
    if (!isError) {
      const {
        id: recipientId,
        username: recipientName,
      } = MAIN_HELPER.getUserFromMention(transferMention, client);

      WALLETS.add(authorId, -transferAmount, accountType);
      WALLETS.add(recipientId, transferAmount);

      const newBalance = WALLETS.getBalance(authorId, accountType);

      const transferMessage = TRANSFER_MESSAGE
        .replace('%currencySymbol%', currencySymbol)
        .replace('%amount%', transferAmount)
        .replace('%username%', recipientName);

      const currentBalanceMessage = GET_BALANCE_MESSAGE
        .replace('%username%', senderName)
        .replace('%accountType%', accountType)
        .replace('%currencySymbol%', currencySymbol)
        .replace('%balance%', newBalance);

      messageEmbed
        .setColor('GREEN')
        .setTitle(TRANSFER_TITLE)
        .setDescription(
          `${transferMessage}\n${currentBalanceMessage}`,
        );
    }

    message.channel.send(messageEmbed);
  },
};
