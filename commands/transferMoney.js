// Config variables.
const { maxWalletAmount, maxBankAmount } = require('../config/economy.json');

// Constants.
const { COMMANDS_CONSTANTS } = require('../constants');

// Helpers.
const {
  MAIN_HELPER, TRANSACTION_HELPER, UTILITY_HELPER, WALLETS,
} = require('../helpers');

// Destruct constants.
const { TRANSFER_MONEY } = COMMANDS_CONSTANTS;

module.exports = {
  ...TRANSFER_MONEY,
  async execute(message, args) {
    const { id: authorId } = message.author;
    const userMention = UTILITY_HELPER.getArgsMention(args);
    const fromAccount = UTILITY_HELPER.getArgsAccountType(args);
    const balance = WALLETS.getBalance(authorId, fromAccount);
    const isAll = args.includes('all');
    const argsAmount = parseInt(UTILITY_HELPER.getArgsAmount(args), 10);
    let amount = isAll ? balance : argsAmount;

    const authorBalance = WALLETS.getBalance(authorId, fromAccount);

    const transaction = new TRANSACTION_HELPER(amount, 'transfer');

    transaction.validateAmount();

    if (!transaction.isError) {
      transaction.validateSufficientBalance(authorBalance, fromAccount);
    }

    if (!transaction.isError) {
      transaction.validateMention(userMention);
    }

    if (!transaction.isError) {
      const { id: receiverId, username: receiverName } = MAIN_HELPER
        .getUserFromMention(userMention, message.client);

      const toBalance = WALLETS.getBalance(receiverId, 'wallet');
      const nextBalance = toBalance + amount;

      if (maxWalletAmount > 0 && nextBalance > maxWalletAmount) {
        amount = maxWalletAmount - toBalance;
        transaction.amount = amount;
      }

      await WALLETS.add(authorId, -amount, fromAccount);
      await WALLETS.add(receiverId, amount, 'wallet');

      transaction.buildMessage(receiverId, receiverName, 'wallet');
    }

    message.channel.send(transaction.messageEmbed);
  },
};
