// Config variables.
const { maxWalletAmount, maxBankAmount } = require('../config/economy.json');

// Helpers.
const {
  TRANSACTION_HELPER, UTILITY_HELPER, WALLETS,
} = require('../helpers');

module.exports = class AddRemoveHelper {
  constructor(message, args, type) {
    this.message = message;
    this.toAccount = type === 'deposit' ? 'bank' : 'wallet';
    this.fromAccount = type === 'deposit' ? 'wallet' : 'bank';
    this.balance = WALLETS.getBalance(message.author.id, this.fromAccount);

    const isAll = args.includes('all');
    const argsAmount = parseInt(UTILITY_HELPER.getArgsAmount(args), 10);
    this.amount = isAll ? this.balance : argsAmount;

    this.transaction = new TRANSACTION_HELPER(this.amount, type);

    this.makeTransaction();
  }

  async makeTransaction() {
    this.transaction.validateAmount();

    const {
      author: { id, username },
    } = this.message;

    if (!this.transaction.isError) {
      this.transaction.validateSufficientBalance(this.balance, this.fromAccount);
    }

    if (!this.transaction.isError) {
      const toBalance = WALLETS.getBalance(id, this.toAccount);
      const nextBalance = toBalance + this.amount;
      const maxAmount = this.toAccount === 'bank' ? maxBankAmount : maxWalletAmount;

      if (maxAmount > 0 && nextBalance > maxAmount) {
        this.amount = maxAmount - toBalance;
        this.transaction.amount = this.amount;
      }

      await WALLETS.add(id, -this.amount, this.fromAccount);
      await WALLETS.add(id, this.amount, this.toAccount);
      this.transaction.buildMessage(id, username, 'bank');
    }

    this.message.channel.send(this.transaction.messageEmbed);
  }
};
