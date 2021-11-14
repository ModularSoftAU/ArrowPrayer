import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'

dotenv.config();

const client = new DiscordJS.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
})

client.on('ready', () => {
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        showWarns: false,
        ignoreBots: true,
        testServers: ['899441191416901632'],
    })
})

client.login(process.env.TOKEN);