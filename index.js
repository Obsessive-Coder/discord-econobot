require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { Op } = require('sequelize');
const db = require('./models');

// Configuration.
const {
  appConfig: { prefix, token },
} = require('./config');

// Constants.
const {
  APP_CONSTANTS: {
    READY_MESSAGE,
    COMMAND_ERROR_MESSAGE,
  },
} = require('./constants');

// Helpers.
const { MainHelper, WalletHelper } = require('./helpers');

// Commands.
const commands = require('./commands');

const wallets = new Collection();
const cooldowns = new Collection();
const client = new Client();

WalletHelper.setupAdd(wallets);
WalletHelper.setupGetWalletBalance(wallets);

client.commands = commands;

client.once('ready', () => {
  db.sequelize.sync({})
    .then(() => {
      console.log(READY_MESSAGE);
    }).catch(error => {
      console.log(error, 'Something went wrong with syncing the database.');
    });
});

client.on('message', message => {
  const { author, content } = message;
  if (!content.startsWith(prefix) || author.bot) return;

  if (message.channel.type !== 'dm') {
    message.channel.messages.delete(message);
  }

  wallets.add(author.id, 1);

  const args = content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = MainHelper.getCommand(client.commands, commandName);

  if (!command) return;

  const { name, cooldown } = command;

  const isEnoughArgs = MainHelper
    .handleArgsCount(message, command, args.length);

  if (!isEnoughArgs) return;

  const isCooldown = MainHelper
    .handleCooldowns(message, cooldowns, name, cooldown);

  if (isCooldown) return;

  try {
    command.execute(message, args);
  } catch (error) {
    message.reply(COMMAND_ERROR_MESSAGE);
  }
});

client.login(token);
