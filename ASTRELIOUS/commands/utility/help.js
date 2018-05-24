const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class Help extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "help",
            group: "utility",
            memberName: "help",
            description: "Display all bot commands or help on specific command.",
            examples: ["help [command]"],
            args: 
            [
                {
                    key: "command",
                    prompt: "Command",
                    type: "string",
                    default: " "
                }
            ]
        });
    }
    
    async run(msg, { command })
    {
        const client = this.client; // For command prefix

        if (command == " ") // Get general help
        {
            const embed = new RichEmbed()
                .setTitle("Help")
                .setColor([0, 210, 255])
                .setFooter("<required> [optional]")
            ;
        
            const groups = this.client.registry.groups; // For commands
            
            groups.forEach(function (group)
            {
                let field1 = "\u200B";
                
                group.commands.forEach(function (cmd)
                {
                    if (cmd.subcommands == null || cmd.subcommands.length == 0)
                    {
                        field1 += `**${client.commandPrefix}${cmd.name} ${getSyntax(cmd)}** : ${cmd.description}\n`;
                    }
                    else
                    {
                        let field2 = "\u200B";

                        cmd.subcommands.forEach(function (sub)
                        {
                            field2 += `**${client.commandPrefix}${cmd.name} ${sub.name} ${getSyntax(cmd)}** : ${sub.description}\n`;
                        });

                        embed.addField(`${cmd.name.substr(0, 1).toUpperCase() + cmd.name.substr(1)}`, field2);
                    }
                });

                if (group.commands.size > 0)
                {
                    embed.addField(`${group.name}`, field1);
                }
            });

            await msg.edit("", { embed });
            return;
        }
        else // Get specific command help
        {
            const commands = this.client.registry.commands;
            let cmd;
            let subCmd;
            let cmdString; 
            
            commands.forEach(function (c)
            {
                if (c.subcommands != null)
                {
                    c.subcommands.forEach(function (sub)
                    {
                        if (`${c.name.toLowerCase()} ${sub.name.toLowerCase()}` == command.toLowerCase())
                        {
                            cmdString = `${c.name} ${sub.name}`;
                            subCmd = sub;
                            cmd = c;
                        }
                    });
                }
                else if (c.name.toLowerCase() == command.toLowerCase())
                {
                    cmdString = `${c.name}`;
                    cmd = c;
                }
            });
            
            if (cmd != null)
            {
                const embed = new RichEmbed()
                    .setTitle(`__${cmdString} Help__`)
                    .setDescription(`\u200B${cmd.description}`)
                    .setColor([0, 210, 255]);

                embed.addField("Syntax", `${client.commandPrefix}${cmdString} ${getSyntax(cmd)}`, true);
                embed.addField("Aliases", `${cmd.aliases}\t${subCmd != null ? subCmd.aliases : "\u200B"}`, true);
                
                if (cmd.argsCollector != null)
                {
                    embed.addField("\u200B", "__**Arguments**__");

                    cmd.argsCollector.args.forEach(function (arg)
                    {
                        if (!arg.key.toLowerCase().includes("subcommand"))
                        {
                            const argInfo = `**Description:** ${arg.prompt}\n**Type:** ${arg.type.id}\n**Required?** ${arg.default == ""}`;

                            embed.addField(`${arg.key}`, argInfo);
                        }
                    });
                }

                await msg.edit("", { embed });
                return;
            }
        }
    }  
};

/**
 * Gets syntax of all arguments for command
 * @param {Command} command Command to get arguments for
 * @returns String of full argument list
 */
function getSyntax(command)
{
    let args = "\u200B";

    if (command.argsCollector != null)
    {
        command.argsCollector.args.forEach(function (a)
        {
            if (!a.key.toLowerCase().includes("subcommand"))
            {
                args += a.default == null || a.default == "" ? `<${a.key}> ` : `[${a.key}] `;
            }
        });
    }

    return args;
}