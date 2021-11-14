import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Replies with Pong.',

    slash: true,
    testOnly: true,

    callback: ({ interaction }) => {
        interaction.reply('Big Pong!')
    },
} as ICommand