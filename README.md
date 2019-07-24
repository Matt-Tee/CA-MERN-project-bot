
# Community Contribution Tracking Bot

## Overview

Discord servers can often fluctuate between fast-paced channels that are impossible to read in their entirety and voids of activity. This bot is intended to serve as a two pronged solution for Discord admins to be able to both see who their most engaging users are and encourage users to post more engaging content.

## Tech Stack

The bot is designed to work in conjunction with a MERN stack application. In particular the bot is set up to send request to an express server. In actuality the bot described by these files could probably be integrated with any web app stack. In order to change this bot to work with a stack of your choosing you only need to set up and integrate an API server like the one used for this project: <https://github.com/gjohn34/MERN-Server>. You will also need to set up a database for storing the data; this project uses MongoDB as its cloud database solution.

Since there is so much documentation for it and the project was already being written in javascript, the bot uses discord.js in order to facilitate its Discord interactions. This required creating an app and bot through the Discord developer portal, however, this is a simple process.

## Bot Systems

The operations of the bot can be separated out into two main parts: the point system and the bot commands.

### Point System

As users are prone to breaking any system that is put in front of them, the point system for the bot was designed with care to reduce the ability of users to game it. When a user reacts to a message, the bot will first check if the user, here on known as the reactor, and the author of the message are registered in the database. If they are not it will register them with a single point to their names. It will then put the reactors points into an equation that will spit out the amount of point that should be applied to the author. If the reactor was to undo their reaction, the same process will be played but with the points deducted from the author instead.

This reaction based point determination system is designed to prevent people from gaining points from simply spamming posts. For similar reasons, the equation used to determine the number of points is a cube root function. This means that the amount of points that a reaction is worth goes up with the number of points that use has. Leading to users have more power to give points the more they have been given. This growth in point power is in the shape of that cube root function and as such starts to have ever reducing gains after a certain point. This is to ensure that no one users reactions are worth enough to make the system trivial.

### Bot Commands

The bot has four main commands: botinfo, points, update and help.

#### botinfo

Causes the bot to message the channel with its basic information.

#### points

Fetches the users information from the database and displays their points.

#### update

Updates the users username in the database. Since discord users can change their username at any given time, this command is designed to ensure that the users have a means of updating their name in the database if they so choose to. Usernames are store in the first place to enable admins to easily correlate users to their points.

#### help

A simple command to display all the bot commands.

## Using the Bot

### Installation

The bot can be run either locally or deployed remotely. In either case the bot uses Node.js and node packages. As such it will require Node.js in order to run.

To run locally make sure you have node installed and then in the projects directory run:

 ```bash
 $ npm install
 ```

Congratulations you have installed the necessary package.

### Discord Developer Portal

Once installation is complete create a file called .env and put the following in it:

``` Text
TOKEN="Your Bot Token"
PREFIX="Your Prefix"
EXPRESSURL="Your Server URL"
```

Now to get your bot token you are going to have to first create a discord app and bot through the discord developer portal. It is pretty simple, just got to: <https://discordapp.com/developers/applications/>
Log in with your discord account and create a new application. After that select the bot option on the side and create a bot for the application. Copy the bots secret token and replace the "Your Bot Token" with the secret one (no quotation marks). Replace the "Your Prefix" with a prefix of your choice for bot commands, a common one is to use '!' (wrap it in single quotation marks as it is required to be a string). Replace "Your Server URL" with the url of the server you will be making requests to (make sure it is also wrapped in quotation marks as it is also required to be a string). It is recommended that you use an express server like the one mentioned in the tech stack section above.

If you are deploying remotely just set environment variables to those values instead of making a .env file.

### Running the Bot

Congratulations you are now ready to run the bot. Most remote deployments will auto detect how to build the bot. For running locally just run:

 ```bash
 $ npm start
 ```

The bot should now be running.
