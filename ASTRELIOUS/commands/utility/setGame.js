const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class SetGame extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "setgame",
            group: "utility",
            memberName: "setgame",
            description: "Set your game to the given text.",
            examples: ["setGame <text>"],
            args: 
            [
                {
                    key: "message",
                    prompt: "Message",
                    type: "string",
                    default: " "
                }
            ]
        });
    }
    
    async run(msg, { message })
    {
        await this.client.user.setActivity(message == " " ? null : message);

        const embed = new RichEmbed();

        if (message == " ")
        {
            embed.setTitle("Game reset.").setColor([0, 255, 0]);
            msg.edit("", { embed });
        }
        else
        {
            embed.setTitle(`Game set to "${message}".`).setColor([0, 255, 0]);
            msg.edit("", { embed });
        }

        return;
    } 
};