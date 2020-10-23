const { readdirSync } = require('fs');
const { basename, join } = require('path');
const { Collection } = require('discord.js');

const fileName = basename(__filename);

const commandFiles = readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0
    && file !== fileName
    && file.slice(-3) === '.js'
  ));

const commands = new Collection();

for (let i = 0; i < commandFiles.length; i++) {
  const file = commandFiles[i];
  const command = require(join(__dirname, file));
  commands.set(command.name, command);
}

module.exports = commands;
