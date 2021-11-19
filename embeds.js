const { Discord, MessageEmbed } = require('discord.js');
const config = require('./config.json');

// 
// Database Issue
// 
const databaseIssue = new MessageEmbed()
.setTitle(`Error`)
.setColor(`${config.colours.danger}`)
.setDescription(`There was a database issue, please try again later.`)


// 
// Channot Not Set
// 
const channelNotSet = new MessageEmbed()
.setTitle(`Error`)
.setColor(`${config.colours.danger}`)
.setDescription(`There was an error in using this command, has the prayer channel been setup?\nUse \`/config show\``)

module.exports = {
    databaseIssue,
    channelNotSet
}