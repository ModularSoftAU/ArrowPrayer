const reqEvent = (event) => require(`../events/${event}`)

module.exports = (client) => {
  // client.on('messageReactionAdd', reqEvent('messageReactionAdd'));
};
