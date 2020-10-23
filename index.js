require('dotenv').config();
const { Client } = require('discord.js');
const config = require('./config');

// Commands.
const commands = require('./commands');

// Configuration variables.
const { prefix, token } = config;

const client = new Client();

client.commands = commands;

client.once('ready', () => {
  console.log('Economy bot is ready!');
});

client.on('message', message => {
  const { content } = message;
  if (!content.startsWith(prefix) || message.author.bot) return;

  const args = content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift();

  if (commands.has(command)) {
    client.commands.get(command).execute(message, args);
  }
});

client.login(token);
