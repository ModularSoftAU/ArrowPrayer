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
        featuresDir: path.join(__dirname, 'features'),
        typeScript: false,
        showWarns: false,
        ignoreBots: true,
        testServers: ['899441191416901632'],
    })
});

client.login(process.env.TOKEN);