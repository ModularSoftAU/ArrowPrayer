const { Discord, Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
const WOKCommands = require('wokcommands');
const path = require('path');

//
// Controllers
//
const database = require('./databaseController'); // Database controller

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
  database.query (`INSERT INTO config (guildID) VALUES (?);`, [guild.id], function (error, results, fields) {
    if (error) {
      throw error;
    } else {
        console.log(`Guild created for ${guild.name} (${guild.id})`);
    }
  });
});

client.on("guildDelete", guild => {
  // When the bot leaves or is kicked, delete config to prevent stale entries.
  database.query (`DELETE FROM config WHERE guildID=?;`, [guild.id], function (error, results, fields) {
    if (error) {
      throw error;
    } else {
        console.log(`Guild deleted for ${guild.name} (${guild.id}) because bot was kicked.`);
    }
  });
});

client.login(process.env.TOKEN);