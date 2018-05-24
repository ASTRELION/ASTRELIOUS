const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class Emoji extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "text",
            group: "general",
            memberName: "text",
            description: "Replace text with given text effect.",
            examples: ["text <effect>"],
            aliases: ["t", "txt"],
            args: 
            [
                {
                    key: "subCommand",
                    prompt: "Sub-command",
                    type: "string",
                    default: ""
                },
                {
                    key: "message",
                    prompt: "Message to modify",
                    type: "string",
                    default: ""
                }
            ]
        });

        this.subcommands = new Array();
        this.subcommands.push(
        {
            name: "emojireplace",
            description: "Replaces alphabetic letters with their cooresponding emoji.",
            aliases: ["emoji", "er"],
            run: this.emojireplace
        });

        this.subcommands.push(
        {
            name: "addspace",
            description: "Add space between each letter.",
            aliases: ["adds", "as"],
            run: this.addspace
        });

        this.subcommands.push(
        {
            name: "altcaps",
            description: "Alternate message with capital letters.",
            aliases: ["alternatecaps", "altcaps", "altcap", "ac"],
            run: this.altcaps
        });
    }

    async emojireplace(msg, { subCommand, message })
    {
        subCommand = subCommand.toLowerCase();
        let msgStr = "";

        for (let i = 0; i < message.length; i++)
        {
            const char = message.charAt(i);

            if ("abcdefghijklmnopqrstuvwxyz".includes(char.toLowerCase()))
            {
                msgStr += `:regional_indicator_${char.toLowerCase()}:`;
            }
            else
            {
                msgStr += char;
            }
        }

        await msg.edit(msgStr);
    }

    async addspace(msg, { subCommand, message })
    {
        subCommand = subCommand.toLowerCase();
        let msgStr = "";

        for (let i = 0; i < message.length; i++)
        {
            msgStr += `${message.charAt(i)} `;
        }

        await msg.edit(msgStr);
    }

    async altcaps(msg, { subCommand, message })
    {
        subCommand = subCommand.toLowerCase();
        let msgStr = "";

        for (let i = 0; i < message.length; i++)
        {
            if (i % 2 == 0)
            {
                msgStr += message.charAt(i).toUpperCase();
            }
            else
            {
                msgStr += message.charAt(i).toLowerCase();
            }   
        }

        await msg.edit(msgStr);
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