const Discord = require('discord.js');

module.exports = {
    name: 'blacklist',
    description: 'Blacklist command.',
    category: 'Testing',
    slash: true,
    testOnly: true,

    options: [
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
    ],
    
    callback: ({ client, interaction }) => {

        console.log(interaction);

    },
}