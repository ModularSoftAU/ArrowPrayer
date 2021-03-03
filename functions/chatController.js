const Discord = require('discord.js');
const config = require('../config.json');
const HexColour = require('../HexColour.json');
const blacklistController = require('../functions/blacklistController');

function invalidArgs(message) {
    let embed = new Discord.MessageEmbed()
    .setTitle('Error!')
    .setColor(HexColour.red)
    .setDescription('Please provide the Discord ID for who will be (un)blacklisted.')
    message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
}

function alreadyBlacklisted(message) {
    let embed = new Discord.MessageEmbed()
    .setTitle('Error!')
    .setColor(HexColour.red)
    .setDescription('This user is already blacklisted.')
    message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
}

function isNotBlacklisted(message) {
    let embed = new Discord.MessageEmbed()
    .setTitle('Error!')
    .setColor(HexColour.red)
    .setDescription('This user is not blacklisted.')
    message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
}

module.exports = {
    invalidArgs,
    isNotBlacklisted
  };