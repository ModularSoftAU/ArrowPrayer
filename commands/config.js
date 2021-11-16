const { Discord, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'config',
    description: 'Configuration command.',
    category: 'Testing',
    slash: true,
    testOnly: true,

    options: [
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
    
    callback: ({ client, interaction }) => {

        // 
        // /config setbotrole
        // 
        if (interaction.options.getSubcommand() === "setbotrole") {
            const botRoleID = interaction.options.getRole('role').id;
            const botRoleDisplayName = interaction.options.getRole('role').name;

            try {
                const embed = new MessageEmbed()
                .setTitle(`The Bot Role has been set.`)
                // .setColor(``)
                .setDescription(`The bot role to control ArrowPrayer has been set to \`${botRoleDisplayName}\``)
    
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


        // 
        // /config setprayerrequestchannel
        // 
        if (interaction.options.getSubcommand() === "setprayerrequestchannel") {
            const requestChannelID = interaction.options.getChannel('requestchannel').id;
            const requestChannelDisplayName = interaction.options.getChannel('requestchannel').name;

            try {
                const embed = new MessageEmbed()
                .setTitle(`The Prayer Request channel has been set.`)
                // .setColor(``)
                .setDescription(`The channel where requests will go has been set to \`${requestChannelDisplayName}\``)
    
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