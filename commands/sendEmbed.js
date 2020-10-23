const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'sendEmbed',
  description: 'Send message embed',
  execute(message, args) {
    const embed = new MessageEmbed()
      .setTitle('Another slick little embed')
      .setColor(0xff0000)
      .setDescription('Hello, this is another slick embed!');

    message.channel.send(embed);
  },
};
