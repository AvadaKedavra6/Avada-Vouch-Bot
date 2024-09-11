  //      Welcome in AVB (Avada Vouch Bot)     \\
 //       Here its the first command file       \\
//            Made with <3 by Avada              \\

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { readData, writeData } = require('../memory/data.js');
const data = readData();
const vouches = new Map(Object.entries(data.vouches || {}));
const leaderboard = data.leaderboard || {};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vouch')
        .setDescription('Let a vouch on a member :)')
        .addUserOption(option => option.setName('user').setDescription('Choose the member').setRequired(true))
        .addIntegerOption(option => option.setName('stars').setDescription('Number of stars (Max 5)').setRequired(true).setMinValue(1).setMaxValue(5))
        .addStringOption(option => option.setName('comment').setDescription('Write the comment (not required)').setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const stars = interaction.options.getInteger('stars');
        const comment = interaction.options.getString('comment');
        const starEmoji = '⭐'.repeat(stars);

        // Dont give vouch to urself >:(
        if (user.id === interaction.user.id) {
            return interaction.reply({ content: 'You cant make tht :face_with_symbols_over_mouth:', ephemeral: true });
        }

        const vouchEmbed = new EmbedBuilder()
            .setColor(0x57F287)
            .setTitle(`New vouch for ${user.username}`)
            .addFields({
                name: 'Stars :',
                value: starEmoji,
                inline: false
            })
            .addFields({
                name: 'Comment :',
                value: comment,
                inline: false
            })
            .setFooter({
                text: `Vouch gived by ${interaction.user.username}`
            });

        await interaction.reply({
            embeds: [vouchEmbed]
        });

        // Stock vouch in the map
        if (!vouches.has(user.id)) {
            vouches.set(user.id, []);
        }

        vouches.get(user.id).push({
            stars,
            comment,
            by: interaction.user.username
        });

        // Update Leaderboard
        if (!leaderboard[user.id]) {
            leaderboard[user.id] = 0;
        }
        leaderboard[user.id] += stars;

        // Save data
        writeData({
            vouches: Object.fromEntries(vouches),
            leaderboard
        });
    },
};