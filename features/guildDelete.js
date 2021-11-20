const database = require('../databaseController');

module.exports = (client, instance) => {
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
};