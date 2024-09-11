  //      Welcome in AVB (Avada Vouch Bot)     \\
 //       Here its the second command file      \\
//            Made with <3 by Avada              \\

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { readData } = require('../memory/data.js');
const vouches = new Map(Object.entries(readData()));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reputation')
        .setDescription('Check the reputation of a member')
        .addUserOption(option => option.setName('user').setDescription('Choose the member').setRequired(true)),

        async execute(interaction) {
            const user = interaction.options.getUser('user');
            const data = readData();
            const vouches = data.vouches || {};
    
            const userVouches = vouches[user.id] || [];
    
            if (userVouches.length === 0) {
                return interaction.reply({ content: 'No vouches found for this member.', ephemeral: true });
            }
    
            const reputationEmbed = new EmbedBuilder()
                .setColor(0xF7FF00)
                .setTitle(`${user.username}'s Reputation`)
    
            userVouches.forEach((vouch, index) => {
                const starEmoji = '⭐'.repeat(vouch.stars);
                reputationEmbed.addFields(
                    { name: `Vouch #${index + 1}`, value: `${starEmoji}\n**Comment :** ${vouch.comment}\n**Given by :** ${vouch.by}`, inline: false }
                );
            });
    
            await interaction.reply({
                embeds: [reputationEmbed]
            });
        },
};