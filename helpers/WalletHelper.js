const { User } = require('../models');

module.exports = class WalletHelper {
  static getAccountField(accountType) {
    return accountType === 'bank' ? 'bank_balance' : 'wallet_balance';
  }

  static getOtherAccountField(accountType) {
    const otherAccountType = accountType === 'bank' ? 'wallet' : 'bank';
    return WalletHelper.getAccountField(otherAccountType);
  }

  static getUserTotalBalance(user, accountType, isTotalBoard) {
    const accountField = WalletHelper.getAccountField(accountType);

    let total = user[accountField];

    if (isTotalBoard) {
      const otherAccountField = WalletHelper.getOtherAccountField(accountType);
      total += user[otherAccountField];
    }

    return total;
  }

  static setupAdd(wallets) {
    Reflect.defineProperty(wallets, 'add', {
      value: async (id, amount, accountType) => {
        const user = wallets.get(id);
        const amountNumber = Number(amount);
        const accountField = WalletHelper.getAccountField(accountType);

        if (user) {
          console.log(user);
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
        const accountField = WalletHelper.getAccountField(accountType);
        const user = wallets.get(id);
        return user ? user[accountField] : 0;
      },
    });
  }
};
