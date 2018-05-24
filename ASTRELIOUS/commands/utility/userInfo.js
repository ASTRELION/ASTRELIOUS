const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class Inspect extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "inspect",
            group: "utility",
            memberName: "inspect",
            description: "Get information on specified user or yourself if no user specified",
            aliases: ["userinfo", "inspectuser", "userstats", "userstat"],
            args:
            [
                {
                    key: "user",
                    prompt: "User ID, mention, or name",
                    type: "string",
                    default: " "
                }
            ]
        });
    }
    
    async run(msg, { user })
    {
        // Parse user
        if (user == " ")
        {
            user = this.client.user;
        }
        else
        {
            const userByID = this.client.users.get(user);

            if (userByID != null)
            {
                user = this.client.users.get(user);
            }
            else if (msg.mentions.users.first() != null)
            {
                user = msg.mentions.users.first();
            }
            else
            {
                const userByName = this.client.users.filter(x => x.tag.toLowerCase().includes(user.toLowerCase()));

                if (userByName != null)
                {
                    user = userByName.first();
                }
                else
                {
                    user = null;
                }
            }
        }

        if (user != null)
        {
            const embed = new RichEmbed()
                .setAuthor(`User Info: ${user.username}#${user.discriminator}`, user.avatarURL)
                .setColor([0, 210, 255])
            ;

            let guildUser = null;
            if (msg.guild != null) guildUser = await msg.guild.fetchMember(user);

            // Status
            const status = user.presence.status;
            let icon = "";

            switch (status)
            {
                case "online":
                    icon = ":large_blue_circle: ";
                    break;
                case "offline":
                    icon = ":black_circle: ";
                    break;
                case "idle":
                    icon = ":white_circle: ";
                    break;
                case "dnd":
                    icon = ":red_circle: ";
                    break;
            }

            embed.addField(
                `${icon}Status`,
                user.presence.status,
                true
            );

            // User ID
            embed.addField(
                ":id: User ID",
                user.id,
                true
            );

            // Bot
            embed.addField(
                ":robot: Bot?",
                user.bot,
                true
            );

            // Game
            embed.addField(
                ":video_game: Game",
                user.presence.game == null ? "none" : user.presence.game.name,
                true
            );

            // Created At
            embed.addField(
                ":birthday: Created At",
                user.createdAt.toDateString(),
                true
            );

             // Age
            const userAge = Math.round((Date.now() - Date.parse(user.createdAt)) / (1000 * 60 * 60 * 24));

            embed.addField(
                ":clock3: Age",
                `${userAge} days (${(userAge / 365).toFixed(2)} years)`,
                true
            );

            // Mutual Servers
            embed.addField(
                ":crossed_swords: Mutual Servers",
                (await user.fetchProfile()).mutualGuilds.size,
                true
            );

            // Last Message Channel
            embed.addField(
                ":abcd: Last Message Channel",
                user.lastMessage == null ? "none" : user.lastMessage.channel,
                true
            );

            // Last Message Sent
            embed.addField(
                ":speech_balloon: Last Message Sent",
                user.lastMessage == null ? "none" : user.lastMessage.content.substring(0, 100),
                true
            );

            // > Guild User Info <
            if (msg.channel.type == "text" && guildUser != null)
            {
                embed.addField(
                    "\u200B",
                    "**Guild Stats**\n\u200b",
                    false
                );

                // Display Name
                let nickname = user.username;
                if (msg.channel.type == "text") nickname = guildUser.displayName;

                embed.addField(
                    ":busts_in_silhouette: Display Name",
                    nickname,
                    true
                );

                // Current Voice Channel
                embed.addField(
                    ":mega: Current Voice Channel",
                    guildUser.voiceChannel == null ? "none" : guildUser.voiceChannel.name,
                    true
                );

                // Role
                embed.addField(
                    ":crown: Role",
                    guildUser.highestRole.name,
                    true
                );

                // Color
                embed.addField(
                    ":paintbrush: Color",
                    guildUser.displayHexColor,
                    true
                );

                // Joined At
                embed.addField(
                    ":inbox_tray: Joined Server On",
                    guildUser.joinedAt.toDateString(),
                    true
                );

                // Server Age
                const serverAge = Math.round((Date.now() - Date.parse(guildUser.joinedAt)) / (1000 * 60 * 60 * 24));

                embed.addField(
                    ":clock3: Server Age",
                    `${serverAge} days (${(serverAge / 365).toFixed(2)} years)`,
                    true
                );
            }

            await msg.edit("", { embed });
        }
        else
        {
            const embed = new RichEmbed()
                .setTitle("Invalid user.")
                .setColor([255, 0, 0]);

            await msg.edit("", { embed });
        }

        return;
    }
};