require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

function fuuckYeah(message) {
  const output = 'Fuuck Yeah Our Custom Bot Is Alive';
  message.channel.send(output);
}

const commands = new Map();
commands.set('fuuckYeah', fuuckYeah);

client.on('message', message => {
  if (message.content[0] === '!') {
    const command = message.content.split(' ')[0].substr(1);
    if (commands.has(command)) {
      commands.get(command)(message);
    }
  }
});

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.TOKEN);
