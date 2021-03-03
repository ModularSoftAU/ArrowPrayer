const Discord = require('discord.js');
const config = require('../config.json');
const HexColour = require('../HexColour.json');
const blacklistController = require('../functions/blacklistController');
const chatController = require('../functions/chatController');

module.exports.run = async (client, message, args) => {

  const user = message.guild.member(message.author); // Get the command user.
  const roles = user.roles.cache; // Get the users roles.
  const userRolesArr = [];
  // Put all roles into an array.
  roles.forEach(function (data) {
    userRolesArr.push(data.name);
  });

  // Check if the user has role access to this command.
  if (userRolesArr.some(role => config.blacklistmanagementroles.includes(role))) {
    switch (args[0]) {
      case "add":
        if (!args[1]) {
          chatController.invalidArgs(message);
          return;
        }

        if (blacklistController.isUserBlacklisted(args[1]) == true) {
          chatController.alreadyBlacklisted(message);
          return;
        } else {
          blacklistController.blacklistUserAdd(message, args[1]); 
        }
        break;

      case "remove":
        if (!args[1]) {
          chatController.invalidArgs(message);
          return;
        }

        if (blacklistController.isUserBlacklisted(args[1]) == false) {
          chatController.isNotBlacklisted(message);
          return;
        } else {
          blacklistController.blacklistUserRemove(message, args[1]); 
        }
        break;

      case "list":
        let blacklistlistembed = new Discord.MessageEmbed()
          .setTitle('List of Blacklisted Users')
          .setColor(HexColour.yellow)
          .setDescription(`${config.blacklistedusers}`)
        message.channel.send(blacklistlistembed);
        break;

      default:
        let embed = new Discord.MessageEmbed()
          .setTitle('Incorrect Usage!')
          .setColor(HexColour.red)
          .setDescription(`${process.env.discordprefix}${module.exports.help.usage}`)
        message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
        break;
    }
  } else {
    let embed = new Discord.MessageEmbed()
      .setTitle('Error!')
      .setColor(HexColour.red)
      .setDescription('You do not have permission to execute this command.')
    message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
    return;
  };
};

module.exports.help = {
  name: 'blacklist',
  description: 'Blacklist a user abusing the prayer request system.',
  usage: 'blacklist [add/remove/(list)] [discord id]'
};