const Discord = require('discord.js');
const config = require('../config.json');
const HexColour = require('../HexColour.json');

module.exports.run = async (client, message, args) => {
  let prayerrequestchannel = message.guild.channels.cache.find(c => c.name === `${config.prayerchannel}`);
  let prayerrequest = args.join(' ');

  if (config.blacklistedusers.includes(message.author.id)) {
    let embed = new Discord.MessageEmbed()
      .setTitle('You are blacklisted.')
      .setColor(HexColour.red)
      .setDescription(`You are blacklisted from using any commands.`)
    message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
    return;
  } else {
    if (!args[0]) {
      let embed = new Discord.MessageEmbed()
        .setTitle('Incorrect Usage')
        .setColor(HexColour.red)
        .setDescription(`Please use the command correctly: ${process.env.discordprefix}${module.exports.help.usage}`)
      message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
      return;
    };

    var embed = new Discord.MessageEmbed()
    .setTitle(`🙏 New Prayer Request`)
    .setColor(HexColour.yellow)
    .setDescription(`${prayerrequest}`)
    .setFooter("Take some time to pray, then react 🙏")

    prayerrequestchannel.send({ embed: embed }).then(embed => {
      embed.react("🙏");
    });
    sendAuditLog(message, message.author, prayerrequest);
    message.delete();
    return;
  }
};

module.exports.help = {
  name: 'pray',
  description: 'Submit a prayer request.',
  usage: 'pray [request]'
};


function sendAuditLog(message, messageAuthor, prayerRequest) {
  let prayerlogchannel = message.guild.channels.cache.find(c => c.name === `${config.prayerlogchannel}`);
  let prayerauditembed = new Discord.MessageEmbed()
    .setTitle('Prayer Request Log')
    .setColor(HexColour.blue)
    .setDescription(`${prayerRequest}`)
    .setFooter(`Submitted by ${messageAuthor.username} (${messageAuthor.id})`)
  prayerlogchannel.send(prayerauditembed);
}