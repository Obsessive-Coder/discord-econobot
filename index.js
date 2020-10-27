require('dotenv').config();
const { Client } = require('discord.js');
const db = require('./models');

// Configuration.
const { prefix, token } = require('./config/app');

// Constants.
const { APPLICATION_CONSTANTS, MESSAGES_CONSTANTS } = require('./constants');

// Helpers.
const { MAIN_HELPER, LOGGER } = require('./helpers');

// Commands.
const commands = require('./commands');

// User wallets collection.
const { WALLETS } = require('./helpers');

// Destruct constants.
const {
  READY_MESSAGE,
  COMMAND_ERROR_MESSAGE,
  BOT_NAME,
  AVATAR_URL,
} = APPLICATION_CONSTANTS;
const {
  UNKNOWN_COMMAND_ERROR_MESSAGE, DB_SYNC_ERROR_MESSAGE,
} = MESSAGES_CONSTANTS;

// Create the client.
const client = new Client();

client.commands = commands;

client.once('ready', () => {
  db.sequelize.sync({})
    .then(async () => {
      client.user.setUsername(BOT_NAME);
      client.user.setAvatar(AVATAR_URL);

      const allUsers = await db.User.findAll();
      allUsers.forEach(user => WALLETS.set(user.id, user));

      LOGGER.log('info', READY_MESSAGE);
    }).catch(error => {
      LOGGER.log('error', `${DB_SYNC_ERROR_MESSAGE} - ${error}`);
    });
});

client.on('guildMemberAdd', async newMember => {
  const welcomeChannel = newMember.guild.channels.cache.find(channel => channel.name === 'the channel name here, make sure the ');

  welcomeChannel.send('Input your message here, if you want an embed then do a "let msgEmbed = new Discord.messageEmbed  /  and input the title and all the embed stuff, customize the message as much as you want!"');


  // Optional Part (you can modify those extra things if you'd like!) :D
  let msgEmbed = new Discord.MessageEmbed()
  .setTitle (`This is a title for a test`)
  // welcomeChannel.send(msgEmbed) | (that's commented so you know to use it only if you want an embed and also don't delete the other "welcomeChannel.send" just change it in there and say "welcomeChannel.send(msgEmbed)" and define the msgEmbed variable as a let and define it above the "welcomeChannel.send" so the bot will check and see that it's defined so errors won't happen!
  if (newMember.bot) return; // checks if it's a bot that joined so the channel won't be spammed with "*Discord Bot* has joined the server" and stuff like that, so check that.
  const newbieRole = newMember.roles.cache.find(role => role.name === 'Role Name here') // that was to define the role to give newbies (you can name the variable however you want that doesn't matter!)
  newMember.roles.add(newbieRole.id) // this will add the role to that member!
  // All the things that are under the "Optional Part" are 100 % Optional! No Requirement to use those, just use it if you want and they won't affect the welcome message at all!
})

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

  // Error if there's no command for the command name.
  if (!command) {
    const errorMessage = UNKNOWN_COMMAND_ERROR_MESSAGE
      .replace('%prefix%', prefix)
      .replace('%command%', commandName);

    message.reply(errorMessage);
    return;
  }

  // Error if not enough required arguments.
  const isEnoughArgs = MAIN_HELPER
    .handleArgsCount(message, command, args.length);

  if (!isEnoughArgs) return;

  // Error if cooldown period.
  const { name, cooldown } = command;
  const isCooldown = MAIN_HELPER
    .handleCooldowns(message, name, cooldown);

  if (isCooldown) return;

  try {
    command.execute(message, args);
  } catch (error) {
    let response = COMMAND_ERROR_MESSAGE;

    if (error) {
      response += `\n\`[ERROR] - ${error}\``;
    }

    LOGGER.log('error', `${COMMAND_ERROR_MESSAGE} - ${error}`);

    message.reply(response);
  }
});

client.login(token);
