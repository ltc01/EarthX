const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { botColor } = require('../../configs/config');
const { sad} = require('../../configs/emojis');
const { queueEmbedResponse, errorEmbed } = require('../../configs/utils');
const { useQueue } = require('discord-player');
const { requireSessionConditions } = require('../../configs/music');
const { BOT_MSGE_DELETE_TIMEOUT } = require('../../configs/constants');

module.exports = {
    category: 'music',
    cooldown: 3,
    aliases: ['q'],
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows the current queue.'),

	async execute(interaction, client) {
        if (!requireSessionConditions(interaction, true, false, false)) return;
        
        try {
            const queue = useQueue(interaction.guild.id);
            if (!queue) {
                interaction.reply({ 
                    embeds: [
                        new EmbedBuilder()
                        .setColor(botColor)
                        .setDescription(`${ sad } Queue is currently empty.`)
                    ]})
                setTimeout(()=> {
                    interaction.deleteReply()
                }, BOT_MSGE_DELETE_TIMEOUT)
                return;
            }

            queueEmbedResponse(interaction, queue);

        }catch (error) {
            await interaction.reply({
                    embeds: [
                        errorEmbed(`Something went wrong while executing \`/queue\` command`)
                    ],
                    ephemeral: true
                });
                console.error(error)
          }
	},
};