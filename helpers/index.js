const wallets = require('./wallets');
const ConfigHelper = require('./ConfigHelper');
const MainHelper = require('./MainHelper');
const HelpHelper = require('./HelpHelper');
const WalletHelper = require('./WalletHelper');
const UtilityHelper = require('./UtilityHelper');

module.exports.wallets = wallets;
module.exports.ConfigHelper = ConfigHelper;
module.exports.MainHelper = MainHelper;
module.exports.HelpHelper = HelpHelper;
module.exports.WalletHelper = WalletHelper;
module.exports.UtilityHelper = UtilityHelper;

module.exports = {
  wallets,
  ConfigHelper,
  MainHelper,
  HelpHelper,
  WalletHelper,
  UtilityHelper,
};
