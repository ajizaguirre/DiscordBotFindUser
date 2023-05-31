'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    const Discord = require("discord.js");

    const bot = new Discord.Client();

    bot.on("message", async (message) => {
        // Check if the message is from the bot itself
        if (message.author.bot) {
            return;
        }

        // Check if the message is a command
        if (message.content.startsWith("!")) {
            const command = message.content.substring(1);

            // Handle the command
            if (command === "hello") {
                message.channel.send("Hello There!");
            } else if (command === "help") {
                message.channel.send(
                    "`Here are the commands:`\n\n!Say hello!\n!help - Shows this message`\n!Type chat to find a specific user you want to send a message to in your server!");
            } else if (command === "chat") {
                // Get the user name from the command
                const userName = message.content.substring(5);

                // Find the user in the Discord server
                const targetUser = message.guild.members.find(user => user.username === userName);

                // If the user is found, open their chat
                if (targetUser) {
                    message.channel.send("Opening chat with " + targetUser.username);
                    message.channel.openPrivateChannel(targetUser);
                } else {
                    message.channel.send("User not found.");
                }
            } else {
                message.channel.send("I don't understand that command.");
            }
        } else {
            // The message is not a command, so just send it back
            message.channel.send(message.content);
        }
    });

    bot.login(process.env.DISCORD_BOT_TOKEN);
}).listen(port);
