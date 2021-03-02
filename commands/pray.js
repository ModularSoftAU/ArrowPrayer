const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  let prayerrequestchannel = message.guild.channels.cache.find(c => c.name === `${config.prayerchannel}`);
  let prayerrequest = args.join(' ');

  var embed = new Discord.MessageEmbed()
    .setTitle(`🙏 New Prayer Request`)
    .setColor('#ffff4d')
    .setDescription(`${prayerrequest}`)
    .setFooter("Take some time to pray, then react 🙏")

  prayerrequestchannel.send({ embed: embed }).then(embed => {
    embed.react("🙏");
  });

  message.delete();
};

module.exports.help = {
  name: 'pray'
};