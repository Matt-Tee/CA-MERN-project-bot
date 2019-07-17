require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
// const express = require('express');
// const app = express();
const {commands} = require("./functions/commands");
const {userCheck} = require("./functions/userCheck");
const {point} = require("./functions/point");
const {unPoint} = require("./functions/unPoint");

// app.listen(process.env.PORT);

// Bot fails to opperate before this ready acknowledgement
client.on('ready', () => {
    console.log('Ready!');
})

// User message processing. If a user types a message with the bot activation prefix the bot will respond.
client.on('message', (m) => {
    if (m.author.bot) { return }

    if (!m.content.startsWith(process.env.PREFIX)) {
        userCheck(m.author, client);
    }
    else {
        // User input is a command and therefore must be handled by the commands function
        commands(m, client);
    }
})

client.on('messageReactionAdd', (reaction, reactor) => {
    if (reactor.bot||reaction.message.author.bot){return}
    userCheck(reactor, client);
    point(reaction.message.author.id, reactor.id)
})

client.on('messageReactionRemove', (reaction, reactor) => {
    if (reactor.bot||reaction.message.author.bot){return}    
    unPoint(reaction.message.author.id, reactor.id)
})

// Enable bot to view events on non chached items
client.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel = client.channels.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    channel.fetchMessage(packet.d.message_id).then(message => {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.get(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        // Assign message to reaction
        reaction.message = message;
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
});

client.login(process.env.TOKEN);