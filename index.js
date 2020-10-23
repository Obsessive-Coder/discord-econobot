import 'dotenv/config.js';
import { Client } from 'discord.js';

const client = new Client();

function fuuckYeah(message) {
  const output = 'Fuuck Yeah Our Custom Bot Is Alive';
  message.channel.send(output);
}

const commands = new Map();
commands.set('fuuckYeah', fuuckYeah);

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  if (message.content[0] === '!') {
    const command = message.content.split(' ')[0].substr(1);

    if (commands.has(command)) {
      commands.get(command)(message);
    }
  }
});

client.login(process.env.TOKEN);
