const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class Lookup extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "lookup",
            group: "utility",
            memberName: "lookup",
            description: "Lookup an ID to see if it is a server, user, or channel",
            aliases: [],
            args: 
            [
                {
                    key: "id",
                    prompt: "ID to lookup",
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    async run(msg, { id })
    {
        const embed = new RichEmbed();
        let type = null;
        let value = null;
        const user = this.client.users.get(id);
        
        if (user != null)
        {
            type = "User";
            value = user;
        }
        else
        {
            const guild = this.client.guilds.get(id);

            if (guild != null)
            {
                type = "Guild";
                value = guild;
            }
            else
            {
                this.client.guilds.forEach(function (g)
                {
                    const channel = g.channels.get(id);

                    if (channel != null)
                    {
                        type = channel.type + " channel";
                        value = channel;
                    }
                });
            }
        }

        if (type != null)
        {
            embed
                .setTitle(`ID ${id} Found`)
                .addField("Type", type, true)
                .addField("Value", value, true)
                .setColor([0, 210, 255])
            ;
        }
        else
        {
            embed
                .setTitle(`ID ${id} not found.`)
                .setColor([255, 0, 0])
            ;
        }

        await msg.edit("", { embed });
    } 
};