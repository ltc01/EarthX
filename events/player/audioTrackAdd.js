const { EmbedBuilder, escapeMarkdown } = require("discord.js");
const { botColor } = require("../../configs/config");
const { music } = require("../../configs/emojis");
const { usePlayer } = require("discord-player");
const { BOT_MSGE_DELETE_TIMEOUT } = require("../../configs/constants");

module.exports = {
  name: 'audioTrackAdd',
  async execute(queue, track, client) {
    const cp = usePlayer(queue)
    if(cp.isPlaying()){
      const res = queue.metadata.channel.send({ embeds: [
        new EmbedBuilder()
          .setColor(botColor)
          .setDescription(`${music} Added to the queue [${escapeMarkdown(track.cleanTitle || track.title)}](${track.url}) - \`${track.duration}\` By ${track.requestedBy}.`)
      ]}).then(msge => setTimeout(() => msge.delete(), BOT_MSGE_DELETE_TIMEOUT )).catch(error => console.log(error))
    }else{
      return
    }
  }
}