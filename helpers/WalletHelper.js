const { User } = require('../models');

module.exports = class WalletHelper {
  static setupAdd(wallets) {
    Reflect.defineProperty(wallets, 'add', {
      value: async (id, amount) => {
        const user = wallets.get(id);
        const amountNumber = Number(amount);

        if (user) {
          user.wallet_balance += amountNumber;
          return user.save();
        }

        const newUser = await User.create({
          id,
          wallet_balance: amountNumber,
        });

        wallets.set(id, newUser);
        return newUser;
      },
    });
  }

  static setupGetWalletBalance(wallets) {
    Reflect.defineProperty(wallets, 'getWalletBalance', {
      value: id => {
        const user = wallets.get(id);
        return user ? user.wallet_balance : 0;
      },
    });
  }
};
