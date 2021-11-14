module.exports = {
    name: 'pray',
    description: 'Submit a prayer request.',
    category: 'Testing',
    slash: true,
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
        interaction.reply('Big Pong!');

    },
}