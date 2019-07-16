require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
// const express = require('express');
// const app = express();
const {commands} = require("./functions/commands");
const {userCheck} = require("./functions/userCheck");

// app.listen(process.env.PORT);

// Bot fails to opperate before this ready acknowledgement
client.on('ready', () => {
    console.log('Ready!');
})

// User message processing. If a user types a message with the bot activation prefix the bot will respond.
client.on('message', (m) => {
    if (m.author.bot) { return }

    if (!m.content.startsWith(process.env.PREFIX)) {
        userCheck(m, client.user.username)
    }
    else {
        // User input is a command and therefore must be handled by the commands function
        commands(m, client);
    }
})


client.login(process.env.TOKEN);