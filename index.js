require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
// const express = require('express');
// const app = express();
const {commands} = require("./functions/commands");
const {axiosPost} = require("./functions/axiosPost");
const {axiosGet} = require("./functions/axiosGet");
var user = {};

// app.listen(process.env.PORT);

// Bot fails to opperate before this ready acknowledgement
client.on('ready', () => {
    console.log('Ready!');
})

// User message processing. If a user types a message with the bot activation prefix the bot will respond.
// Otherwise the bot will check if the user is registered and if not register them.
client.on('message', m => {
    if (m.author.bot) { return }

    if (!m.content.startsWith(process.env.PREFIX)) {
        user = axiosGet(m.author.id)
        if (!user.user_id) { 
            user = axiosPost(m.author.id, m.author.username)
            m.channel.send(`Congratulations ${res.data.username}! You have been noticed by ${client.user.username}.`)        
        }   
        return
    }
    else {
        // User input is a command and therefore must be handled by the commands function
        commands(m);
    }
})


client.login(process.env.TOKEN);