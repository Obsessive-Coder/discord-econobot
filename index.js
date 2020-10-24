require('dotenv').config();
const { Client, Collection } = require('discord.js');

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
  MESSAGE_CONSTANTS: {
    INVALID_ARGUMENT_ERROR_MESSAGE,
    USAGE_ERROR_MESSAGE,
    COOLDOWN_MESSAGE,
  },
} = require('./constants');

// Helpers.
const { MainHelper } = require('./helpers');

// Commands.
const commands = require('./commands');

const cooldowns = new Collection();
const client = new Client();

client.commands = commands;

client.once('ready', () => {
  console.log(READY_MESSAGE);
});

client.on('message', message => {
  const { author, content } = message;
  if (!content.startsWith(prefix) || author.bot) return;

  message.channel.messages.delete(message);

  const args = content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);
  const { name, cooldown } = command;

  const isEnoughArgs = MainHelper
    .handleArgsCount(message, command, args.length, author);

  if (!isEnoughArgs) return;

  const isCooldown = MainHelper
    .handleCooldowns(message, cooldowns, name, cooldown, author.id);

  if (isCooldown) return;

  try {
    command.execute(message, args);
  } catch (error) {
    message.reply(COMMAND_ERROR_MESSAGE);
  }
});

client.login(token);
