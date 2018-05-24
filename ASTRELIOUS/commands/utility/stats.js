const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class Stats extends Command
{
    constructor(client)
    {
        super(client, 
        {
            name: "stats",
            group: "utility",
            memberName: "stats",
            description: "Get stats on the current bot state",
            aliases: ["stat"]
        });
    }
    
    async run(msg)
    {
        const stats = this.client.clientStats.get(this.client.user.id);

        const embed = new RichEmbed()
            .setAuthor("Client Stats", this.client.user.avatarURL)
            .setColor([0, 210, 255])
        ;

        // Messages Sent
        embed.addField(
            ":outbox_tray: Messages Sent",
            stats.messagesSent,
            true
        );

        // Messages Received
        embed.addField(
            ":inbox_tray: Messages Received",
            stats.messagesReceived,
            true
        );

        // Commands Issued
        embed.addField(
            ":keyboard: Commands Issued",
            stats.commandsIssued,
            true
        );

        // Mentions
        embed.addField(
            ":exclamation: Mentions",
            stats.mentions,
            true
        );

        // Servers
        embed.addField(
            ":crossed_swords: Servers",
            this.client.guilds.size,
            true
        );
        
        // Game
        embed.addField(
            ":video_game: Game",
            this.client.user.presence.game == null ? "none" : this.client.user.presence.game.name,
            true
        );

        // Bot Uptime
        const date = new Date(null);
        date.setSeconds(this.client.uptime / 1000); // specify value for SECONDS here

        embed.addField(
            ":arrow_up: Bot Uptime",
            date.toISOString().substr(11, 8),
            true
        );

        // User Creation
        embed.addField(
            ":birthday: User Creation",
            this.client.user.createdAt.toDateString(),
            true
        );

        // User Age
        const userAge = Math.round((Date.now() - Date.parse(this.client.user.createdAt)) / (1000 * 60 * 60 * 24));

        embed.addField(
            ":clock3: User Age",
            `${userAge} days (${(userAge / 365).toFixed(2)} years)`,
            true
        );

        await msg.edit("", { embed });

        return;
    }
};