  //      Welcome in AVB (Avada Vouch Bot)     \\
 //       Here its the third command file       \\
//            Made with <3 by Avada              \\

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { readData } = require('../memory/data.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Display the member with the most vouches'),

    async execute(interaction) {
        const data = readData();
        const leaderboard = data.leaderboard;

        if (Object.keys(leaderboard).length === 0) {
            return interaction.reply({ content: 'No vouches found yet.', ephemeral: true });
        }

        const sortedLeaderboard = Object.entries(leaderboard)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10); // Top 10 members

        const leaderboardEmbed = new EmbedBuilder()
            .setColor(0x9B00FF)
            .setTitle('Vouch Leaderboard')
            .setDescription('Top 10 members with the most vouches !');

        sortedLeaderboard.forEach(([userId, points], index) => {
            const user = interaction.guild.members.cache.get(userId);
            leaderboardEmbed.addFields(
                { name: `${index + 1}. ${user ? user.user.username : 'Unknown'}`, value: `Vouches : ${points}`, inline: false }
            );
        });

        await interaction.reply({
            embeds: [leaderboardEmbed]
        });
    },
};