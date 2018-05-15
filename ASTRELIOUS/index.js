const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands");

// Load commands
for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    let commandString = "Module Loaded: ";

    if ("commands" in command)
    {
        for (let i = 0; i < command.commands.length; i++)
        {
            commandString += command.commands[i] + " ";
            client.commands.set(command.commands[i], command[command.commands[i]]);
        }
    }

    console.log(commandString);
}

// Ready event
client.on("ready", () =>
{
    console.log("Ready!");
});

// Handle command
client.on("message", message =>
{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try
    {
        client.commands.get(command).execute(client, message, args);
    }
    catch (error)
    {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
    }
});

client.login(token);
