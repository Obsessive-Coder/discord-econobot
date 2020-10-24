const { Collection } = require('discord.js');
const WalletHelper = require('./WalletHelper');

const wallets = new Collection();

WalletHelper.setupAdd(wallets);
WalletHelper.setupGetBalance(wallets);

module.exports = wallets;
