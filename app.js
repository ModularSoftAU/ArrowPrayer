const { Discord, Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
const WOKCommands = require('wokcommands');
const path = require('path');
const Enmap = require('enmap');

dotenv.config();

const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

client.on('ready', () => {
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: false,
        showWarns: false,
        ignoreBots: true,
        testServers: ['899441191416901632'],
    })
});

client.on("guildCreate", guild => {
  // When the bot joins, create config.
  client.config.delete(guild.id);
});

client.on("guildDelete", guild => {
  // When the bot leaves or is kicked, delete config to prevent stale entries.
  client.config.delete(guild.id);
});

client.config = new Enmap({
    name: "config",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep',

    // 
    guildID: null,
    botRole: null,
    prayerRequestChannel: null,
    prayerRequestLogChannel: null,
    blacklistedUsers: []
  });

client.login(process.env.TOKEN);