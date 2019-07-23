const Discord = require('discord.js');
const {axiosGet} = require('./axiosGet');
const {axiosPatch} = require('./axiosPatch');

module.exports = { commands: async (m, client) => {
    // Separating the user message into meaningful chunks 
    var mArray = m.content.split(" ");
    var mCommand = mArray[0].slice(1);
    // Arguments for use in more advanced bot commands, only uncomment if you have added such commands.
    // var mArguments = mArray.slice(1);
    // Initialising some variables for use later
    var data = {};
    var dataTwo = {};
    var botResponse = new Discord.RichEmbed();

    // Process user message and respond accordingly
    switch (mCommand) {
        // Creates an embed for stylistic reasons. Fills it with the bots basic information.
        case 'botinfo':
            botResponse = new Discord.RichEmbed()
                .setDescription('Bot Information')
                .setColor("#FFFFFF")
                .addField("Bot Name", client.user.username);
            return m.channel.send(botResponse);

        // Fetches from the API and then informs users of their points. If they are not in the database the bot response accordingly
        case 'points':
            data = await axiosGet(m.author.id)
            if (data.user_id) {
                return m.channel.send(`${m.author.username}, you have ${data.points} points!`);
            }
            else {
                return m.channel.send(`Sorry ${m.author.username}. We can't seem to find you in our database. Either you have not made a post on this account since the bot has been activated on this server or our bot servers are down. If this error persists please let us know.`)
            }

        // Checks if the users username is the same as the one in the database. If not the bot shall put through a patch to fix it.
        case 'update':
            data = await axiosGet(m.author.id)
            if (data.username == m.author.username) {
                return m.channel.send('Username already up to date! Nice!')
            }
            else {
                dataTwo = await axiosPatch(m.author.id, { username: m.author.username })
                return m.channel.send(`${data.username} shall now be known as ${dataTwo.username}`)
            }
        
        // Makes a nice looking embed to display a list of possible commands to the user.
        case 'help':
            botResponse = new Discord.RichEmbed()
                .setDescription('Valid Commands')
                .setColor("#FFFFFF")
                .addField(`${process.env.PREFIX}botinfo`, "Displays detailed information about the bot that is currently in use.")
                .addField(`${process.env.PREFIX}points`, 'Displays the number of points you have accumulated.')
                .addField(`${process.env.PREFIX}update`, 'Forces the bot to use your current username when referring to you. Please use this if you have changed your name recently as the bot has a good memory and bad people skills.')
                .addField(`${process.env.PREFIX}help`, 'Displays this helpful little list of commands for the uninitiated.');

            return m.channel.send(botResponse);

        // If the user makes a mistake and enters a command that is not supported the bot will inform them and inform them of the help command.
        default:
            return m.channel.send(`Not a valid bot request, type ${process.env.PREFIX}help for a list of valid commands.`)
    }
}}