const Discord = require('discord.js');

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
            "type": 1, // 1 is type SUB_COMMAND
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
        {
            "name": "blacklist",
            "description": "Blacklist users abusing",
            "type": 2,
            "options": [
                {
                    "name": "add",
                    "description": "Add a user to the blacklist.",
                    "type": 1,
                    "options": [
                        {
                            "name": "user",
                            "description": "The user to blacklist.",
                            "type": 6,
                            "required": true
                        }
                    ]
                },
                {
                    "name": "remove",
                    "description": "Remove a user from the blacklist.",
                    "type": 1,
                    "options": [
                        {
                            "name": "user",
                            "description": "The user to remove from the blacklist.",
                            "type": 6,
                            "required": true
                        }
                    ]
                }
            ]
        },
    ],
    
    callback: ({ client, interaction }) => {
        const guildConf = client.config.get(interaction.guild.id);
        
        interaction.reply(`BIG PONG\n ${guildConf}`);
    },
}