// Helpers.
const {
  NEW_TRANSACTION_HELPER, UTILITY_HELPER, WALLETS,
} = require('../helpers');

module.exports = class AddRemoveHelper {
  constructor(message, args, type) {
    this.message = message;
    this.toAccount = type === 'deposit' ? 'bank' : 'wallet';
    this.fromAccount = type === 'deposit' ? 'wallet' : 'bank';
    this.balance = WALLETS.getBalance(message.author.id, this.fromAccount);

    const isAll = args.includes('all');
    this.amount = isAll ? this.balance : UTILITY_HELPER.getArgsAmount(args);

    this.transaction = new NEW_TRANSACTION_HELPER(this.amount, type);

    this.makeTransaction();
  }

  makeTransaction() {
    this.transaction.validateAmount();

    const {
      author: { id, username },
    } = this.message;

    if (!this.transaction.isError) {
      this.transaction.validateSufficientBalance(this.balance, this.fromAccount);
    }

    if (!this.transaction.isError) {
      WALLETS.add(id, -this.amount, this.fromAccount);
      WALLETS.add(id, this.amount, this.toAccount);
      this.transaction.buildMessage(id, username, 'bank');
    }

    this.message.channel.send(this.transaction.messageEmbed);
  }
};
