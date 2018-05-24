const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class Style extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "style",
            group: "general",
            memberName: "style",
            description: "Display styled text.",
            examples: ["style <style>"],
            aliases: ["sty"],
            args: 
            [
                {
                    key: "style",
                    prompt: "Text style to format with",
                    type: "string",
                    default: ""
                },
                {
                    key: "message",
                    prompt: "Message to be formatted",
                    type: "string",
                    default: ""
                }
            ]
        });
    }
    
    async run(msg, { style, message })
    {
        style = style.toLowerCase();
        let msgStr = message;

        if (style.includes("codeblock"))
        {
            msgStr = `\`\`\`${msgStr}\`\`\``;
        }
        else
        {
            if (style.includes("code"))
            {
                msgStr = `\`${msgStr}\``;
            }
    
            if (style.includes("i"))
            {
                msgStr = `*${msgStr}*`;
            }
    
            if (style.includes("b"))
            {
                msgStr = `**${msgStr}**`;
            }
    
            if (style.includes("u"))
            {
                msgStr = `__${msgStr}__`;
            }
    
            if (style.includes("s"))
            {
                msgStr = `~~${msgStr}~~`;
            }
        }

        await msg.edit(msgStr);

        return;
    } 
};