const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class Ping extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "ping",
            group: "utility",
            memberName: "ping",
            description: "Ping the bot.",
            examples: ["ping"]
        });
    }
    
    async run(msg)
    {
        await msg.edit("Pinging...");
        await msg.edit(`Pong! (${Math.round(this.client.ping)}ms)`);
        return;
    } 
};