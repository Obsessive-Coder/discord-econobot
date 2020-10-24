const ConfigHelper = require('./ConfigHelper');
const MainHelper = require('./MainHelper');
const HelpHelper = require('./HelpHelper');
const WalletHelper = require('./WalletHelper');
const wallets = require('./wallets');

module.exports.ConfigHelper = ConfigHelper;
module.exports.MainHelper = MainHelper;
module.exports.HelpHelper = HelpHelper;
module.exports.WalletHelper = WalletHelper;
module.exports.wallets = wallets;

module.exports = {
  ConfigHelper,
  MainHelper,
  HelpHelper,
  WalletHelper,
  wallets,
};
