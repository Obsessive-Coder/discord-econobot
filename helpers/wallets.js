const { Collection } = require('discord.js');
const WalletHelper = require('./WalletHelper');

const wallets = new Collection();

WalletHelper.setupAdd(wallets);
WalletHelper.setupGetWalletBalance(wallets);

module.exports = wallets;
