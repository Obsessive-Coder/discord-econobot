require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { Op } = require('sequelize');
const db = require('./models');

// Configuration.
const {
  APP_CONFIG: { prefix, token },
} = require('./config');

// Constants.
const {
  APPLICATION_CONSTANTS: {
    READY_MESSAGE,
    COMMAND_ERROR_MESSAGE,
  },
} = require('./constants');

// Helpers.
const { MAIN_HELPER } = require('./helpers');

// Commands.
const commands = require('./commands');

const { WALLETS } = require('./helpers');

const cooldowns = new Collection();
const client = new Client();

client.commands = commands;

client.once('ready', () => {
  db.sequelize.sync({})
    .then(async () => {
      const storedWalletBalances = await db.User.findAll();
      storedWalletBalances.forEach(user => WALLETS.set(user.id, user));

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

  const args = content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = MAIN_HELPER.getCommand(client.commands, commandName);

  if (!command) return;

  const { name, cooldown } = command;

  const isEnoughArgs = MAIN_HELPER
    .handleArgsCount(message, command, args.length);

  if (!isEnoughArgs) return;

  const isCooldown = MAIN_HELPER
    .handleCooldowns(message, cooldowns, name, cooldown);

  if (isCooldown) return;

  WALLETS.add(author.id, 1, 'wallet');

  try {
    command.execute(message, args);
  } catch (error) {
    message.reply(COMMAND_ERROR_MESSAGE);
  }
});

client.login(token);
