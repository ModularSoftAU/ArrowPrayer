const { Discord, MessageEmbed } = require('discord.js');
const config = require('./config.json');

// 
// Database Issue
// 
const databaseIssue = new MessageEmbed()
.setTitle(`Error`)
.setColor(`${config.colours.danger}`)
.setDescription(`There was an issue fetching the guild configuration, please try again later.`)


// 
// Prayer Channel Not Set
// 
const prayerChannelNotSet = new MessageEmbed()
.setTitle(`Error`)
.setColor(`${config.colours.danger}`)
.setDescription(`Unable to send, the Prayer channel has not been set. \nUse \`/config setPrayerRequestChannel\` to set the channel.`)


// 
// Prayer Log Channel Not Set
// 
const prayerLogChannelNotSet = new MessageEmbed()
.setTitle(`Error`)
.setColor(`${config.colours.danger}`)
.setDescription(`Unable to send, the Prayer log channel has not been set. \nUse \`/config setPrayerRequestLogChannel\` to set the channel.`)

module.exports = {
    databaseIssue,
    prayerChannelNotSet,
    prayerLogChannelNotSet
}