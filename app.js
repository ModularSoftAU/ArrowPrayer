//
// Project Constants
//
require ('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({ disableEveryone: true });
client.commands = new Discord.Collection();
require('./util/eventLoader.js')(client);

//
// File Constants
//
const package = require('./package.json');
const config = require('./config.json');

//
// Discord Commands & Integration
//
// Reads all commands & boot them in.
fs.readdir('./commands', (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    console.log('Couldn\'t find commands.');
    return
  }

  jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`);
    console.log(`[CONSOLE] [DISCORD] ${files} has been loaded.`);
    client.commands.set(props.help.name, props);
  })
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = process.env.discordprefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!cmd.startsWith(prefix)) return;
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);
});

//
// Application Boot
//
function applicationboot() {
  console.log(`\n// ${package.name} v.${package.version}\nGitHub Repository: ${package.homepage}\nCreated By: ${package.author}`);
  client.login(process.env.discordapitoken);

  client.on("ready", () => {
    console.log('[CONSOLE] [DISCORD] Discord bot has been deployed.');
  });
};

applicationboot();
