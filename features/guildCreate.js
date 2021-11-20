module.exports = (client, instance) => {
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
};