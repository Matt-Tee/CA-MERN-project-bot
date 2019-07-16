const { axiosGet } = require('./axiosGet')
const { axiosPost } = require('./axiosPost')
const Discord = require('discord.js');

// Checks if user exists in database and then registers them if they don't.
module.exports.userCheck = async (m, botname) => {
    // A 404 error will be logged if user is not found. This is expected and handled. Do not be alarmed.
    let user = await axiosGet(m.author.id)
    if (!user.user_id) {
        user = await axiosPost(m.author.id, m.author.username)
        m.channel.send(`Congratulations ${user.username}! You have been noticed by ${botname}.`)
    }
}   