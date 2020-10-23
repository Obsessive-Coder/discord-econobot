require('dotenv').config();
const { Client } = require('discord.js');

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

// Commands.
const commands = require('./commands');

const client = new Client();

client.commands = commands;

client.once('ready', () => {
  console.log(READY_MESSAGE);
});

client.on('message', message => {
  const { content } = message;
  if (!content.startsWith(prefix) || message.author.bot) return;

  const args = content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  // if (command.args && !args.length) {
  //   return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  // }

  try {
    command.execute(message, args);
    message.channel.messages.delete(message);
  } catch (error) {
    message.reply(COMMAND_ERROR_MESSAGE);
  }
});

client.login(token);
