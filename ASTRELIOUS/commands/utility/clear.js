const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class Clear extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "clear",
            group: "utility",
            memberName: "clear",
            description: "Clear current channel by adding blank space."
        });
    }

    async run(msg, { id })
    {
        const line = "\n\u200B";
        let space = line;

        for (let i = 0; i < 35; i++)
        {
            space += line;
        }
        
        await msg.delete();
        await msg.say(`${space}\n\`Chat cleared by ${this.client.user.tag}\``);
    } 
};