// Config variables.
const { maxWalletAmount, maxBankAmount } = require('../config/economy.json');

// Helpers.
const {
  TRANSACTION_HELPER, MAIN_HELPER, UTILITY_HELPER, WALLETS,
} = require('../helpers');

module.exports = class AddRemoveHelper {
  constructor(message, args, type) {
    this.message = message;
    this.userMention = UTILITY_HELPER.getArgsMention(args);
    this.account = UTILITY_HELPER.getArgsAccountType(args);

    const amount = parseInt(UTILITY_HELPER.getArgsAmount(args), 10);
    this.amount = type === 'remove' ? -amount : amount;

    this.transaction = new TRANSACTION_HELPER(amount, type);

    this.makeTransaction();
  }

  async makeTransaction() {
    const { roles } = this.message.member;
    this.transaction.validateRole(roles, 'Leadership');

    if (!this.transaction.isError) {
      this.transaction.validateAmount();
    }

    if (!this.transaction.isError) {
      this.transaction.validateMention(this.userMention);
    }

    if (!this.transaction.isError) {
      const { client } = this.message;

      const { id, username } = MAIN_HELPER
        .getUserFromMention(this.userMention, client);

      const currentBalance = WALLETS.getBalance(id, this.account);
      const nextBalance = currentBalance + this.amount;
      const maxAmount = this.account === 'bank' ? maxBankAmount : maxWalletAmount;

      if (maxAmount > 0 && nextBalance > maxAmount) {
        this.amount = maxAmount - currentBalance;
      }

      if (nextBalance < 0) {
        this.amount = -currentBalance;
      }

      this.transaction.amount = this.amount;

      await WALLETS.add(id, this.amount, this.account);
      this.transaction.buildMessage(id, username, this.account);
    }

    this.message.channel.send(this.transaction.messageEmbed);
  }
};
