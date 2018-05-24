const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class Emoji extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "emoji",
            group: "general",
            memberName: "emoji",
            description: "Display given emoji",
            examples: ["emoji <emoji>"],
            aliases: ["e"],
            args: 
            [
                {
                    key: "subCommand",
                    prompt: "Sub-command",
                    type: "string",
                    default: ""
                }
            ]
        });

        this.subcommands = new Array();
        this.subcommands.push(
        {
            name: "lenny",
            description: "Displays ( ͡° ͜ʖ ͡°)",
            aliases: ["len"],
            run: this.lenny
        });

        this.subcommands.push(
        {
            name: "tableflip",
            description: "Displays (╯°□°）╯︵ ┻━┻",
            aliases: ["tblflp"],
            run: this.tableflip
        });

        this.subcommands.push(
        {
            name: "tableset",
            description: "Displays (╯°□°）╯︵ ┻━┻",
            aliases: ["tblflp"],
            run: this.tableset
        });

        this.subcommands.push(
        {
            name: "dontcare",
            description: "Displays ¯\\_(ツ)_/¯",
            aliases: ["tblflp"],
            run: this.dontcare
        });

        this.subcommands.push(
        {
            name: "seal",
            description: "Displays ᶘ ᵒᴥᵒᶅ",
            aliases: [],
            run: this.seal
        });
    }
    
    async lenny(msg, { subCommmand })
    {
        await msg.edit("( ͡° ͜ʖ ͡°)");
        return;
    }

    async tableflip(msg, { subCommmand })
    {
        await msg.edit("(╯°□°）╯︵ ┻━┻");
        return;
    }

    async tableset(msg, { subCommmand })
    {
        await msg.edit("┬─┬﻿ ノ( ゜-゜ノ)");
        return;
    }

    async dontcare(msg, { subCommmand })
    {
        await msg.edit("¯\\_(ツ)_/¯");
        return;
    }

    async seal(msg, { subCommmand })
    {
        await msg.edit("ᶘ ᵒᴥᵒᶅ");
        return;
    }

    async run(msg, args)
    {
        Array.from(this.subcommands).filter(function(x)
        {
            if (x.name == args.subCommand.toLowerCase() || x.aliases.includes(args.subCommand.toLowerCase()))
            {
                return x.run(msg, args);
            }
        });
    } 
};