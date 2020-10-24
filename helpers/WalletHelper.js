const { User } = require('../models');

module.exports = class WalletHelper {
  static setupAdd(wallets) {
    Reflect.defineProperty(wallets, 'add', {
      value: async (id, amount, accountType) => {
        const user = wallets.get(id);
        const amountNumber = Number(amount);
        const accountField = accountType === 'bank'
          ? 'bank_balance' : 'wallet_balance';

        if (user) {
          user[accountField] += amountNumber;
          return user.save();
        }

        const newUser = await User.create({
          id,
          [accountField]: amountNumber,
        });

        wallets.set(id, newUser);
        return newUser;
      },
    });
  }

  static setupGetBalance(wallets) {
    Reflect.defineProperty(wallets, 'getBalance', {
      value: (id, accountType) => {
        const accountField = accountType === 'bank'
          ? 'bank_balance' : 'wallet_balance';

        const user = wallets.get(id);
        return user ? user[accountField] : 0;
      },
    });
  }
};
