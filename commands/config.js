const { Discord, MessageEmbed } = require('discord.js');
const config = require('../config.json');
const database = require('../databaseController');

module.exports = {
    name: 'config',
    description: 'Configuration command.',
    category: 'Testing',
    slash: true,
    testOnly: true,

    options: [
        {
            "name": "show",
            "description": "Show the current configuration.",
            "type": 1
        },
        {
            "name": "setbotrole",
            "description": "Set the role for which role can configure the bot.",
            "type": 1,
            "options": [
                {
                    "name": "role",
                    "description": "The role to configure the bot.",
                    "type": 8,
                    "required": true
                }
            ]
        },
        {
            "name": "setprayerrequestchannel",
            "description": "Set Prayer Request Channel",
            "type": 1,
            "options": [
                {
                    "name": "requestchannel",
                    "description": "The channel to send prayer requests to.",
                    "type": 7,
                    "required": true
                }
            ]
        },
        {
            "name": "setprayerrequestlogchannel",
            "description": "Set Prayer Request Log Channel",
            "type": 1,
            "options": [
                {
                    "name": "logchannel",
                    "description": "The channel to send prayer requests log to.",
                    "type": 7,
                    "required": true
                }
            ]
        },
    ],
    
    callback: ({ interaction }) => {
        // 
        // /config show
        // 
        if (interaction.options.getSubcommand() === "show") {
            try {
                database.query (`SELECT * FROM config WHERE guildID=?;`, [interaction.guildId], function (error, results, fields) {
                    if (error) {
                      throw error;
                    } else {
                        console.log(results);
                        const embed = new MessageEmbed()
                        .setTitle(`${interaction.guild.name}'s Configuration`)
                        .setColor(`${config.colours.info}`)
                        .setDescription(`botRole: ${results[0].botRole}\nprayerRequestChannel: ${results[0].prayerRequestChannel}\nprayerRequestLogChannel: ${results[0].prayerRequestLogChannel}`)
            
                        interaction.reply({
                            embeds: [embed],
                            ephemeral: true 
                        });
                        return
                    }
                });
                return
            } catch (error) {
                console.log(error);
                return   
            }
        }


        // 
        // /config setbotrole
        // 
        if (interaction.options.getSubcommand() === "setbotrole") {
            const botRoleID = interaction.options.getRole('role').id;
            const botRoleDisplayName = interaction.options.getRole('role').name;

            try {
                database.query (`UPDATE config SET botRole=? WHERE guildID=?;`, [botRoleID, interaction.guildId], function (error, results, fields) {
                    if (error) {
                      throw error;
                    } else {
                        const embed = new MessageEmbed()
                        .setTitle(`The Bot Role has been set.`)
                        .setColor(`${config.colours.success}`)
                        .setDescription(`The bot role to control ArrowPrayer has been set to \`${botRoleDisplayName}\``)
            
                        interaction.reply({
                            embeds: [embed],
                            ephemeral: true 
                        });
                        return
                    }
                });
            } catch (error) {
                console.log(error);
                return   
            }
        }


        // 
        // /config setprayerrequestchannel
        // 
        if (interaction.options.getSubcommand() === "setprayerrequestchannel") {
            const requestChannelID = interaction.options.getChannel('requestchannel').id;
            const requestChannelDisplayName = interaction.options.getChannel('requestchannel').name;

            try {
                database.query (`UPDATE config SET botRole=? WHERE guildID=?;`, [botRoleID, interaction.guildId], function (error, results, fields) {
                    if (error) {
                      throw error;
                    } else {
                        const embed = new MessageEmbed()
                        .setTitle(`The Prayer Request channel has been set.`)
                        .setColor(`${config.colours.success}`)
                        .setDescription(`The channel where requests will go has been set to \`${requestChannelDisplayName}\``)
            
                        interaction.reply({
                            embeds: [embed],
                            ephemeral: true 
                        });
                        return
                    }
                });
            } catch (error) {
                console.log(error);
                return   
            }
        }


        // 
        // /config setprayerrequestlogchannel
        // 
        if (interaction.options.getSubcommand() === "setprayerrequestlogchannel") {
            const requestLogChannelID = interaction.options.getChannel('logchannel').id;
            const requestLogChannelDisplayName = interaction.options.getChannel('logchannel').name;

            try {
                const embed = new MessageEmbed()
                .setTitle(`The Prayer Request Log channel has been set.`)
                .setColor(`${config.colours.success}`)
                .setDescription(`The channel where requests will be logged has been set to \`${requestLogChannelDisplayName}\``)
    
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true 
                });
                return
            } catch (error) {
                console.log(error);
                return   
            }
        }
    },
}