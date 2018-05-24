const { CommandoClient } = require("discord.js-commando");
const path = require("path");

const { prefix, token, ownerID } = require("./config.json");

const client = new CommandoClient(
{
    commandPrefix: prefix,
    owner: ownerID,
    selfbot: true,
    unknownCommandResponse: false,
    nonCommandEditable: false,
    commandEditableDuration: 0
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["general", "General"],
        ["utility", "Utility"]
    ])
    .registerCommandsIn(path.join(__dirname, "commands"));

    const Enmap = require("enmap");
    const EnmapLevel = require("enmap-level");
    client.clientStats = new Enmap({ provider: new EnmapLevel({ name: "clientStats", persistent: true }) });

client.on("ready", () =>
{
    // Create new stat object if none exists
    if (client.clientStats.get(client.user.id) == null)
    {
        const stats =
        {
            messagesSent: 0,
            messagesReceived: 0,
            commandsIssued: 0,
            mentions: 0,
        };

        client.clientStats.set(client.user.id, stats);
        console.log(`> Client stats created for ${client.user.id}`);
    }

    console.log("Ready!");
});

client.on("message", (msg) =>
{
    if (msg.author.id == client.user.id)
    {
        const stats = client.clientStats.get(client.user.id);
        stats.messagesSent += 1;

        if (msg.content.startsWith(client.commandPrefix)) stats.commandsIssued += 1;

        client.clientStats.set(client.user.id, stats);
    }
    else
    {
        const stats = client.clientStats.get(client.user.id);
        stats.messagesReceived += 1;

        if (msg.isMentioned(client.user)) stats.mentions += 1;

        client.clientStats.set(client.user.id, stats);
    }
});

client.login(token);