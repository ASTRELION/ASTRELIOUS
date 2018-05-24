const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class Purge extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "purge",
            group: "utility",
            memberName: "purge",
            description: "Delete past messages",
            examples: ["purge <amount>"],
            aliases: [],
            args: 
            [
                {
                    key: "amount",
                    prompt: "Amount of message to delete",
                    type: "integer",
                    default: " "
                }
            ]
        });
    }

    async run(msg, { amount })
    {
        amount = amount == " " ? 100 : amount;

        let messages = await msg.channel.fetchMessages({ limit: amount });
        messages = messages.filter(x => x.author.id == this.client.user.id).array().slice(0, amount);
        messages.map(x => x.delete());
    } 
};