const { Collection } = require('discord.js');
const WALLET_HELPER = require('./WalletHelper');

const wallets = new Collection();

WALLET_HELPER.setupAdd(wallets);
WALLET_HELPER.setupGetBalance(wallets);

module.exports = wallets;
