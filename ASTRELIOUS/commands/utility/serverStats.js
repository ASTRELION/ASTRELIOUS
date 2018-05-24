const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class ServerStats extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "serverstats",
            group: "utility",
            memberName: "serverstats",
            description: "Get stats on this server or specified server",
            aliases: ["serverstat", "serverinfo"],
            args:
            [
                {
                    key: "server",
                    prompt: "Server name or ID",
                    type: "string",
                    default: " "
                }
            ]
        });
    }
    
    async run(msg, { server })
    {
        if (server == " ")
        {
            server = msg.channel.guild;
        }
        else
        {
            server = this.client.guilds.filter(function (g)
            {
                if (g.id == server || g.name.toLowerCase().includes(server.toLowerCase())) return g;
            });

            server = server.first();
        }

        if (server != null)
        {
            const embed = new RichEmbed()
                .setAuthor(`Server Info: ${server.name}`, server.iconURL)
                .setColor(server.owner.colorRole == null ? [0, 210, 255] : server.owner.colorRole.color)
                .setThumbnail(server.iconURL)
            ;

            // Owner
            embed.addField(
                ":busts_in_silhouette: Owner", 
                `${server.owner.user.username}#${server.owner.user.discriminator}`, 
                false
            );

            // Online Users
            embed.addField(
                ":small_blue_diamond: Online Users",
                `${server.members.filter(x => x.presence.status == "online").size}`,
                true
            );

            // Total Users
            embed.addField(
                ":small_orange_diamond: Total Users",
                `${server.members.size}`,
                true
            );

            // Text Channels
            embed.addField(
                ":abcd: Text Channels",
                `${server.channels.filter(x => x.type == "text").size}`,
                true
            );

            // Voice Channels
            embed.addField(
                ":mega: Voice Channels",
                `${server.channels.filter(x => x.type == "voice").size}`,
                true
            );

            // Region
            embed.addField(
                ":mountain: Region",
                `${server.region}`,
                true
            );

            // Verification Level
            embed.addField(
                ":lock: Verification Level",
                `${server.verificationLevel}`,
                true
            );

            // Creation Date
            embed.addField(
                ":birthday: Creation Date",
                `${server.createdAt.toDateString()}`,
                true
            );

            const serverAge = Math.round((Date.now() - Date.parse(server.createdAt)) / (1000 * 60 * 60 * 24));

            // Age
            embed.addField(
                ":clock3: Age",
                `${serverAge} days (${(serverAge / 365).toFixed(2)} years)`,
                true
            );
        
            await msg.edit("", { embed });
        }
        else
        {
            const embed = new RichEmbed()
                .setTitle("Invalid server.")
                .setColor([255, 0, 0])
            ;

            await msg.edit("", { embed });
        }

        return;
    }
};