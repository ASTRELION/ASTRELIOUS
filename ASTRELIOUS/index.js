const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);

    if ("commands" in command)
    {
        for (let i = 0; i < command.commands.length; i++)
        {
            for (command.commands[i] in command)
            {
                client.commands.set(command.commands[i], command[command.commands[i]]);
            }
        }
    }

    console.log(client.commands);
}

client.on("ready", () =>
{
    console.log("Ready!");
});

client.on("message", message =>
{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try
    {
        client.commands.get(command).execute(message, args);
    }
    catch (error)
    {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
    }

    console.log(message.content);
});

client.login(token);
