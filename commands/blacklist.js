const Discord = require('discord.js');
const fs = require('fs');
const configFile = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const config = require('../config.json');
const blacklistedusers = config.blacklistedusers;

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
        const blacklistinguser = message.guild.member(args[1]); // Get requesting blacklist user.

        config.blacklistedusers.push(blacklistinguser);


        // try {
          
        //   return;
        // } catch (error) {
        //   let embed = new Discord.MessageEmbed()
        //     .setTitle('Error!')
        //     .setColor('#ff6666')
        //     .setDescription('The process to blacklist the following user failed, please check the console.')
        //   message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));

        //   console.log(error);
        // }

        message.channel.send("I want to add someone to the blacklist.");
        break;

      case "remove":
        message.channel.send("I want to remove someone to the blacklist.");
        break;

      default:
        let embed = new Discord.MessageEmbed()
          .setTitle('Incorrect Usage!')
          .setColor('#ff6666')
          .setDescription(`${process.env.discordprefix}${module.exports.help.usage}`)
        message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
        break;
    }



  } else {
    let embed = new Discord.MessageEmbed()
      .setTitle('Error!')
      .setColor('#ff6666')
      .setDescription('You do not have permission to execute this command.')
    message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
    return;
  };
};

module.exports.help = {
  name: 'blacklist',
  description: 'Blacklist a user abusing the prayer request system.',
  usage: 'blacklist [add/remove] [discord id]'
};
