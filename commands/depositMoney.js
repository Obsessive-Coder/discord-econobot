const { MessageEmbed } = require('discord.js');

// Economy variables.
const { currencySymbol } = require('../config/economy.json');

// Constants.
const {
  COMMANDS_CONSTANTS, MESSAGES_CONSTANTS,
} = require('../constants');

// Helpers.
const { WALLETS, UTILITY_HELPER } = require('../helpers');

// Destruct constants.
const { DEPOSIT_MONEY } = COMMANDS_CONSTANTS;
const {
  AMOUNT_ERROR_MESSAGE,
  INSUFFICIENT_FUNDS_ERROR_MESSAGE,
  DEPOSIT_ERROR_TITLE,
  DEPOSIT_TITLE,
  DEPOSIT_MESSAGE,
  BALANCE_MESSAGE,
} = MESSAGES_CONSTANTS;

module.exports = {
  ...DEPOSIT_MONEY,
  execute(message, args) {
    const {
      username,
      id: authorId,
    } = message.author;

    const currentBalance = WALLETS.getBalance(authorId, 'wallet');
    const isDepositAll = args.includes('all');
    const depositAmount = isDepositAll
      ? currentBalance : UTILITY_HELPER.getArgsAmount(args);

    const messageEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle(DEPOSIT_ERROR_TITLE);

    let isError = false;

    // Error if amount is undefined or not a number.
    if (!depositAmount || Number.isNaN(depositAmount) || depositAmount <= 0) {
      messageEmbed.setDescription(AMOUNT_ERROR_MESSAGE);
      isError = true;
    }

    // Error if the user doesn't have enough money.
    if (!isError && depositAmount > currentBalance) {
      messageEmbed.setDescription(
        INSUFFICIENT_FUNDS_ERROR_MESSAGE
          .replace('%balance%', currentBalance),
      );

      isError = true;
    }

    // Deposit the money.
    if (!isError) {
      WALLETS.add(authorId, -depositAmount, 'wallet');
      WALLETS.add(authorId, depositAmount, 'bank');

      const newWalletBalance = WALLETS.getBalance(authorId, 'wallet');
      const newBankBalance = WALLETS.getBalance(authorId, 'bank');

      const depositMessage = DEPOSIT_MESSAGE
        .replace('%symbol%', currencySymbol)
        .replace('%amount%', depositAmount);

      const walletBalanceMessage = BALANCE_MESSAGE
        .replace('%name%', username)
        .replace('%type%', 'wallet')
        .replace('%symbol%', currencySymbol)
        .replace('%balance%', newWalletBalance);

      const bankBalanceMessage = BALANCE_MESSAGE
        .replace('%name%', username)
        .replace('%type%', 'bank')
        .replace('%symbol%', currencySymbol)
        .replace('%balance%', newBankBalance);

      messageEmbed
        .setColor('GREEN')
        .setTitle(DEPOSIT_TITLE)
        .setDescription(
          `${depositMessage}\n${walletBalanceMessage}\n${bankBalanceMessage}`,
        );
    }

    message.channel.send(messageEmbed);
  },
};
