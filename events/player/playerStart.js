const { errorLog } = require("../../configs/logger");
const { startedPlayingEmbed } = require("../../helper/utils");

module.exports = {
  name: 'playerStart',
  async execute(queue, track, client) {
    try {
        const res = await queue.metadata.channel.send({ embeds: [
          startedPlayingEmbed(queue, track, client)
        ]});
      queue.metadata.previousTrack = res.id
      return
    } catch (error) {
      errorLog('An error occured with player event!')
      console.log(error);
    }
  }
}