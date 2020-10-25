require('dotenv').config();
const { Client, Collection } = require('discord.js');
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
  MESSAGES_CONSTANTS: {
    UNKNOWN_COMMAND_ERROR_MESSAGE,
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

      // eslint-disable-next-line no-console
      console.log(READY_MESSAGE);
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log(error, 'Something went wrong with syncing the database.');
    });
});

client.on('message', message => {
  const { author, channel, content } = message;
  if (!content.startsWith(prefix) || author.bot) return;

  // Delete the command message.
  if (channel.type !== 'dm') {
    channel.messages.delete(message);
  }

  // Get the command and its arguments.
  const args = content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = MAIN_HELPER.getCommand(client.commands, commandName);

  if (!command) {
    message.reply(
      UNKNOWN_COMMAND_ERROR_MESSAGE
        .replace('%prefix%', prefix)
        .replace('%command%', commandName),
    );
    return;
  }

  const isEnoughArgs = MAIN_HELPER
    .handleArgsCount(message, command, args.length);

  if (!isEnoughArgs) return;

  const { name, cooldown } = command;

  const isCooldown = MAIN_HELPER
    .handleCooldowns(message, cooldowns, name, cooldown);

  if (isCooldown) return;

  try {
    command.execute(message, args);
  } catch ({ message: errorMessage }) {
    let response = COMMAND_ERROR_MESSAGE;

    if (errorMessage) {
      response += `\n\`ERROR: ${errorMessage}\``;
    }

    message.reply(response);
  }
});

client.login(token);
