require('dotenv').config()
const axios = require('axios');
const cctsAPI = axios.create({ baseURL: 'https://stormy-tundra-35633.herokuapp.com/' });
const Discord = require('discord.js');
const client = new Discord.Client();
var botResponse = new Discord.RichEmbed();

// Bot fails to opperate before this ready acknowledgement
client.on('ready', () => {
    console.log('Ready!');
})

// User message processing. If a user types a message with the bot activation prefix the bot will respond.
client.on('message', m => {
    if (!m.content.startsWith(process.env.PREFIX)) {
        return
    }
    else {
        // Seperating the user message into meaningful chunks 
        mArray = m.content.split(" ")
        mCommand = mArray[0].slice(1)
        mArguments = mArray.slice(1)

        // Process user message and respond accordingly
        switch (mCommand) {
            case 'botinfo':
                botResponse = new Discord.RichEmbed()
                    .setDescription('Bot Information')
                    .setColor("#FFFFFF")
                    .addField("Bot Name", client.user.username);
                return m.channel.send(botResponse);

            case 'register':
                cctsAPI.post('/users', { user_id: m.author.id, username: m.author.username, points: 0 })
                    .then(response => {
                        m.channel.send(`Congratulations ${response.data.username}! You have successfully registered for the community points program.`)
                    })
                    .catch(function (error) {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }
                        console.log(error.config);
                    });
                return;

            case 'points':
                cctsAPI.get(`/users/${m.author.id}`).then(response => {
                    m.channel.send(`${m.author.username}, you have ${response.data.points} points!`)
                }).catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
                return;

            case 'update':
                cctsAPI.get(`/users/${m.author.id}`).then(response => {
                    if (response.data.username === m.author.username) {
                        return m.channel.send('Username already up to date! Nice!')
                    }
                    else {
                        cctsAPI.patch(`/users/${m.author.id}`, m.author.username).then(res => {
                            return m.channel.send(`${response.data.username} shall now be known as ${res.data.username}`)
                        }).catch(function (error) {
                            if (error.response) {
                                // The request was made and the server responded with a status code
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            } else if (error.request) {
                                // The request was made but no response was received
                                console.log(error.request);
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        });
                    }
                }).catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });

            case 'help':
                botResponse = new Discord.RichEmbed()
                    .setDescription('Valid Commands')
                    .setColor("#FFFFFF")
                    .addField(`${process.env.PREFIX}botinfo`, "Displays detailed information about the bot in use.")
                    .addField(`${process.env.PREFIX}points`, 'Displays the number of community contribution points acumulated.')
                    .addField(`${process.env.PREFIX}register`, 'Registers the user for community points program.')
                    .addField(`${process.env.PREFIX}update`, 'Updates the users name in the CCTS. Please use this if you have recently changed your name recently as the bot has a good memory and bad people skills.')
                    .addField(`${process.env.PREFIX}help`, 'Displays this helpful little list of commands for the uninitiated.');

                return m.channel.send(botResponse);

            default:
                return m.channel.send(`Not a valid bot request, type ${process.env.PREFIX}help for a list of valid commands.`)
        }
    }
})



client.login(process.env.TOKEN);