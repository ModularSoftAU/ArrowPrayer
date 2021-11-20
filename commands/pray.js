const { Discord, MessageEmbed } = require('discord.js');
const config = require('../config.json');
const database = require('../databaseController');
const { databaseIssue, channelNotSet } = require('../embeds');

module.exports = {
    name: 'pray',
    description: 'Submit a prayer request.',
    category: 'Testing',
    slash: true,
    guildOnly: true,
    testOnly: true,

    options: [
        {
          name: 'prayerrequest',
          description: 'The request that you would like to submit.',
          required: true,
          type: 3,
        },
        {
          name: 'anonymous',
          description: 'Specify if you would like to remain anonymous.',
          required: false,
          type: 5,
        },
      ],

    callback: ({ interaction }) => {
        try {
          database.query (`SELECT * FROM config WHERE guildID=?;`, [interaction.guildId], function (error, results, fields) {
              if (error) {
                interaction.reply({
                  embeds: [databaseIssue],
                  ephemeral: true 
                });
                console.log(error);
                return;
              } else {
                  try { 
                    let prayerRequestChannel = interaction.guild.channels.cache.get(results[0].prayerRequestChannel);
                    let prayerRequestLogChannel = interaction.guild.channels.cache.get(results[0].prayerRequestLogChannel);
                    let prayerrequest = interaction.options.getString('prayerrequest');
                    let anonymous = interaction.options.getBoolean('anonymous');

                    if (prayerRequestChannel || prayerRequestLogChannel == typeof undefined) {
                      interaction.reply({
                        embeds: [channelNotSet],
                        ephemeral: true 
                      });
                      return                      
                    }

                    // 
                    // Send prayer request to channel
                    //
                    const publicPrayerRequestEmbed = new MessageEmbed()
                    .setDescription(`${prayerrequest}`)

                    if (anonymous == true) {
                      publicPrayerRequestEmbed.setTitle(`Anonymous Prayer Request`)
                      publicPrayerRequestEmbed.setColor(`${config.colours.warning}`)
                      publicPrayerRequestEmbed.setFooter(`Submitted Anonymously`)
                    } else {
                      publicPrayerRequestEmbed.setTitle(`${interaction.user.username}'s Prayer Request`)
                      publicPrayerRequestEmbed.setColor(`${config.colours.info}`)
                      publicPrayerRequestEmbed.setFooter(`Take some time to pray, then react 🙏\nSubmitted By: ${interaction.user.username}`)
                    }

                    prayerRequestChannel.send({embeds: [publicPrayerRequestEmbed]}).then(embed => {
                      embed.react("🙏");
                    });

                    // 
                    // Send prayer request to logs
                    // 
                    const publicPrayerRequestLogEmbed = new MessageEmbed()
                    .setTitle(`${interaction.user.username}'s Prayer Request`)
                    .setColor(`${config.colours.info}`)
                    .setDescription(`${prayerrequest}`)
                    .setFooter(`Submitted By: ${interaction.user.username}`)

                    prayerRequestLogChannel.send({embeds: [publicPrayerRequestLogEmbed]});

                    // 
                    // Send message to user saying their prayer has been submitted.
                    // 
                    const prayerSubmitted = new MessageEmbed()
                    .setTitle(`Prayer Request Submitted`)

                    if (anonymous == true) {
                      prayerSubmitted.setColor(`${config.colours.warning}`)
                      prayerSubmitted.setDescription(`Your prayer request was successfully submitted anonymously.`);
                    } else {
                      prayerSubmitted.setColor(`${config.colours.success}`)
                      prayerSubmitted.setDescription(`Your prayer request was successfully submitted.`);
                    }

                    interaction.reply({
                        embeds: [prayerSubmitted],
                        ephemeral: true 
                    });
                    return
 
                  } catch (error) {
                    console.log(error);

                    interaction.reply({
                      embeds: [channelNotSet],
                      ephemeral: true 
                    });
                  }
             }
          });
          return
      } catch (error) {
        interaction.reply({
          embeds: [databaseIssue],
          ephemeral: true 
        });

        console.log(error);
        return;  
      }
    },
}