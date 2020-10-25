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
const { WITHDRAW_MONEY } = COMMANDS_CONSTANTS;
const {
  AMOUNT_ERROR_MESSAGE,
  INSUFFICIENT_FUNDS_ERROR_MESSAGE,
  WITHDRAW_ERROR_TITLE,
  WITHDRAW_TITLE,
  WITHDRAW_MESSAGE,
  BALANCE_MESSAGE,
} = MESSAGES_CONSTANTS;

module.exports = {
  ...WITHDRAW_MONEY,
  execute(message, args) {
    const {
      username,
      id: authorId,
    } = message.author;

    const currentBalance = WALLETS.getBalance(authorId, 'bank');
    const isWithdrawAll = args.includes('all');
    const withdrawAmount = isWithdrawAll
      ? currentBalance : UTILITY_HELPER.getArgsAmount(args);

    const messageEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle(WITHDRAW_ERROR_TITLE);

    let isError = false;

    // Error if amount is undefined or not a number.
    if (!withdrawAmount || Number.isNaN(withdrawAmount) || withdrawAmount <= 0) {
      messageEmbed.setDescription(AMOUNT_ERROR_MESSAGE);
      isError = true;
    }

    // Error if the user doesn't have enough money.
    if (!isError && withdrawAmount > currentBalance) {
      messageEmbed.setDescription(
        INSUFFICIENT_FUNDS_ERROR_MESSAGE
          .replace('%balance%', currentBalance),
      );

      isError = true;
    }

    // Withdraw the money.
    if (!isError) {
      WALLETS.add(authorId, -withdrawAmount, 'bank');
      WALLETS.add(authorId, withdrawAmount, 'wallet');

      const newWalletBalance = WALLETS.getBalance(authorId, 'wallet');
      const newBankBalance = WALLETS.getBalance(authorId, 'bank');

      const depositMessage = WITHDRAW_MESSAGE
        .replace('%symbol%', currencySymbol)
        .replace('%amount%', withdrawAmount);

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
        .setTitle(WITHDRAW_TITLE)
        .setDescription(
          `${depositMessage}\n${walletBalanceMessage}\n${bankBalanceMessage}`,
        );
    }

    message.channel.send(messageEmbed);
  },
};
