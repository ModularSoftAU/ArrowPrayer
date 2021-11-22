module.exports = (client, instance) => {
    let pluralnonpluralguild = (client.guilds.cache.size > 1) ? 'Guilds' : 'Guild';
    let pluralnonpluralusers = (client.guilds.cache.size > 1) ? 'Users' : 'User';

    const statusOptions = [
        "Use /pray to start praying!",
        "Developed by ModularEnigma",
        "http://www.modularenigma.com/",
        `Over ${client.guilds.cache.size} ${pluralnonpluralguild} praying!`,
        "http://www.modularenigma.com/discord",
        `Over ${client.users.cache.size} ${pluralnonpluralusers} praying!`,
    ]
    let counter = 0;

    const updateStatus = () => {
        client.user.setPresence({
            status: 'online',
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
        })

        if (++counter >= statusOptions.length) {
            counter = 0
        }

        setTimeout(updateStatus, 1000 * 300)
    }
    updateStatus();
};