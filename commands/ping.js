const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Replies with Pong.',
    category: 'Testing',
    slash: true,
    testOnly: true,
    
    callback: ({ client, interaction }) => {
        const guildConf = client.config.get(interaction.guild.id);
        
        interaction.reply(`BIG PONG\n ${guildConf}`);
    },
}