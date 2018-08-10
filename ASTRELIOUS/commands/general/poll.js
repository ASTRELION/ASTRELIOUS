const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

const numbers = 
[
    "\u0030\u20E3", "\u0031\u20E3", "\u0032\u20E3", "\u0033\u20E3", "\u0034\u20E3", "\u0035\u20E3", 
    "\u0036\u20E3", "\u0037\u20E3", "\u0038\u20E3", "\u0039\u20E3", "\uD83D\uDD1F"
];

module.exports.numbers =
{
    numbers: numbers
};

class Poll extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "poll",
            group: "general",
            memberName: "poll",
            description: "Create a reaction-based poll",
            aliases: ["rpoll"],
            args: 
            [
                {
                    key: "subCommand",
                    prompt: "Sub-command",
                    type: "string",
                    default: ""
                },
                {
                    key: "input",
                    prompt: "Poll commands",
                    type: "string",
                    default: " "
                }
            ]
        });

        this.subcommands = new Array();
        this.subcommands.push(
        {
            name: "create",
            description: "Create a new poll, .poll create <title> : <option1> | <option2> | ...",
            aliases: ["start"],
            run: this.create
        });
        
        this.subcommands.push(
        {
            name: "destroy",
            description: "Stop your poll, if you have one active.",
            aliases: ["stop"],
            run: this.stop
        });
    }
    
    async create(msg, { subCommand, input }, client)
    {
        const arr = input.split(":").map(x => x.trim());
        const options = arr[1].split("|").map(x => x.trim());
        let embed = new RichEmbed();
        
        if (client.polls.get(client.user.id) != null)
        {
            embed
                .setTitle("You already have a poll running!")
                .setColor([255, 0, 0])
            ; 
        }
        else if (arr.length != 2 || options.length > 11)
        {
            embed
                .setTitle("Invalid poll syntax.\nSyntax: .poll <title> : <option1> | <option2> | ... (Max: 11).")
                .setColor([255, 0, 0])
            ;
        }
        else
        {
            let dur = -1;

            if (options[options.length - 1].startsWith("time="))
            {
                const time = options.pop();
                const i = time.indexOf("=");
                dur = Number(time.substring(i + 1, time.length));
            }

            const poll =
            {
                pollMessageID: msg.id,
                pollTitle: arr[0],
                pollOptions: options,
                duration: dur,
                pollVotes: new Array(options.length).fill(0),
                voters: new Array().push(client.user.id)
            };
            
            for (let i = 0; i < poll.pollOptions.length; i++)
            {
                await msg.react(numbers[i]);
            }

            const gen = new GeneratePoll();
            embed = await GeneratePoll.generatePoll(msg, poll);
            client.polls.set(client.user.id, poll);
        }

        await msg.edit("", { embed });
    }

    async stop(msg, { subCommand, input }, client)
    {
        client.polls.delete(client.user.id, null);

        await msg.edit("`Current poll stopped.`");
    }

    async run(msg, args)
    {
        const client = this.client;
        Array.from(this.subcommands).filter(function (x)
        {
            if (x.name == args.subCommand.toLowerCase() || x.aliases.includes(args.subCommand.toLowerCase()))
            {
                return x.run(msg, args, client);
            }
        });
    } 
}

class GeneratePoll
{
    constructor()
    {
        this.generatePoll = GeneratePoll.generatePoll;
    }

    static async generatePoll(msg, pollData)
    {   
        const embed = new RichEmbed()
            .setTitle(`__${pollData.pollTitle}__`)
            .setFooter(`Active - Duration: ${pollData.duration == -1 ? "infinite" : pollData.duration + "s"}`)
            .setColor([0, 210, 255])
        ;

        for (let i = 0; i < pollData.pollOptions.length; i++)
        {
            embed.addField(
                i == 0 ? "Options" : "\u200B",
                `${numbers[i]} ${pollData.pollOptions[i]}`,
                true
            );

            embed.addField(
                i == 0 ? "Votes" : "\u200B",
                pollData.pollVotes[i],
                true
            );
            
            embed.addBlankField(true);
        }

        return embed;
    }
}

module.exports = Poll;
module.exports.GeneratePoll = GeneratePoll;