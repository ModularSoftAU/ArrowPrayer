const { Discord, MessageEmbed } = require('discord.js');
const config = require('../config.json');
const database = require('../databaseController');

module.exports = {
    name: 'config',
    aliases: ['conf'],
    description: 'Configuration command.',
    category: 'Configuration',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    guildOnly: true,
    testOnly: true,

    options: [
        {
            "name": "show",
            "description": "Show the current configuration.",
            "type": 1
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
        {
            "name": "toggleprayerlogs",
            "description": "Toggle Prayer Request logging.",
            "type": 1,
            "options": [
                {
                    "name": "toggle",
                    "description": "Toggle for request logging.",
                    "type": 5,
                    "required": true
                }
            ]
        },
    ],
    
    callback: ({ client, interaction }) => {
        // 
        // /config show
        // 
        if (interaction.options.getSubcommand() === "show") {
            try {
                database.query (`SELECT * FROM config WHERE guildID=?;`, [interaction.guildId], function (error, results, fields) {
                    if (error) {
                      throw error;
                    } else {
                        let prayerRequestLogChannelDisplayName = interaction.guild.channels.cache.get(results[0].prayerRequestLogChannel);

                        const embed = new MessageEmbed()
                        .setTitle(`${interaction.guild.name}'s Configuration`)
                        .setColor(`${config.colours.info}`)

                        if (interaction.guild.channels.cache.get(results[0].prayerRequestChannel) == undefined) {
                            embed.addField(`Prayer Request Channel`, `\`Not Yet Set\``)
                        } else {
                            embed.addField(`Prayer Request Channel`, `${interaction.guild.channels.cache.get(results[0].prayerRequestChannel)}`)
                        };

                        if (interaction.guild.channels.cache.get(results[0].prayerRequestLogChannel) == undefined) {
                            embed.addField(`Prayer Request Channel Log`, `\`Not Yet Set\``)
                        } else {
                            embed.addField(`Prayer Request Channel Log`, `${interaction.guild.channels.cache.get(results[0].prayerRequestLogChannel)}`)
                        };

                        if (results[0].prayerLogEnable == 0) {
                            embed.addField(`Prayer Request Channel Log Toggle`, `\`FALSE\``)
                        } else {
                            embed.addField(`Prayer Request Channel Log Toggle`, `\`TRUE\``)
                        };
            
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
        // /config toggleprayerlogs
        // 
        if (interaction.options.getSubcommand() === "toggleprayerlogs") {
            const toggleBoolean = interaction.options.getBoolean('toggle');

            try {
                database.query (`SELECT * FROM config WHERE guildID=?; UPDATE config SET prayerLogEnable=? WHERE guildID=?;`, [interaction.guildId, toggleBoolean, interaction.guildId], function (error, results, fields) {
                    if (error) {
                      throw error;
                    } else {
                        const embed = new MessageEmbed()
                        .setTitle(`The Prayer Request Logs has been set.`)
                        .setColor(`${config.colours.success}`)
                        .setDescription(`The Prayer Request Logs have been set to \`${toggleBoolean}\``)
            
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
                database.query (`SELECT * FROM config WHERE guildID=?; UPDATE config SET prayerRequestChannel=? WHERE guildID=?;`, [interaction.guildId, requestChannelID, interaction.guildId], function (error, results, fields) {
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
                database.query (`SELECT * FROM config WHERE guildID=?; UPDATE config SET prayerRequestLogChannel=? WHERE guildID=?;`, [interaction.guildId, requestLogChannelID, interaction.guildId], function (error, results, fields) {
                    if (error) {
                      throw error;
                    } else {
                        const embed = new MessageEmbed()
                        .setTitle(`The Prayer Request Log channel has been set.`)
                        .setColor(`${config.colours.success}`)
                        .setDescription(`The channel where requests will be logged has been set to \`${requestLogChannelDisplayName}\``)
            
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
    },
}