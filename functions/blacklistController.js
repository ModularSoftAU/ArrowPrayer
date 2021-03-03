const Discord = require('discord.js');
const fs = require('fs');
const HexColour = require('../HexColour.json');
const config = require('../config.json');

function blacklistUserAdd(message, discordid) {
  let rawConfigData = fs.readFileSync('config.json');
  let jsonConfigData = JSON.parse(rawConfigData);
  jsonConfigData["blacklistedusers"].push(`${discordid}`);
  let jsonFinishedConfigData = JSON.stringify(jsonConfigData);
  fs.writeFileSync('config.json', jsonFinishedConfigData);
    
  let embed = new Discord.MessageEmbed()
    .setTitle('Blacklist Addition Successful.')
    .setColor(HexColour.green)
    .setDescription(`${discordid} has been added and can no longer use commands.`)
  message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
}

function blacklistUserRemove(message, discordid) {
  let rawConfigData = fs.readFileSync('config.json');
  let jsonConfigData = JSON.parse(rawConfigData);
  jsonConfigData["blacklistedusers"].splice(jsonConfigData["blacklistedusers"].indexOf(`${discordid}`));
  let jsonFinishedConfigData = JSON.stringify(jsonConfigData);
  fs.writeFileSync('config.json', jsonFinishedConfigData);
  
  let embed = new Discord.MessageEmbed()
    .setTitle('Blacklist Removal Successful.')
    .setColor(HexColour.yellow)
    .setDescription(`${discordid} has been removed and can now use commands.`)
  message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
}

function isUserBlacklisted(discordid) {
  if (config.blacklistedusers.includes(discordid)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  blacklistUserAdd,
  blacklistUserRemove,
  isUserBlacklisted
};
