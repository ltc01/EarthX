const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { botColor } = require('../../configs/config');
const { requireSessionConditions } = require('../../configs/music');
const { usePlayer, useQueue } = require('discord-player');
const { errorEmbed } = require('../../configs/utils');
const { BOT_MSGE_DELETE_TIMEOUT, ERROR_MSGE_DELETE_TIMEOUT } = require('../../configs/constants');

module.exports = {
    category: 'music',
    cooldown: 3,
	data: new SlashCommandBuilder()
		.setName('music-ping')
		.setDescription("Replies with bot's music ping."),
	async execute(interaction, client) {

        try {
            if (!requireSessionConditions(interaction, true, false, false)) return;
            const ping = useQueue(interaction.guild.id).ping
            if(!ping) { 
                interaction.reply({ embeds: [ errorEmbed(`No ping fetched`) ]})
                setTimeout(()=> interaction.deleteReply(), ERROR_MSGE_DELETE_TIMEOUT)
                return
            }
                
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(botColor)
                        .setAuthor({
                            iconURL: client.user.displayAvatarURL(),
                            name: `${client.user.username}`
                        })
                        .setDescription(`My music Latency: ${ping} ms.`)
                ]
            })
            setTimeout(() => {
                interaction.deleteReply()
            }, BOT_MSGE_DELETE_TIMEOUT);

        } catch (error) {
            await interaction.reply({
                embeds: [
                    errorEmbed(`Something went wrong while executing \`/vc-ping\` command`)
                ],
                ephemeral: true
            });
            console.error(error)
        }
		
	},
};