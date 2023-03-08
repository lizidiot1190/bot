const { getAudioUrl } = require("google-tts-api");
const got = require("got");
const {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require("@discordjs/voice");

module.exports = {
  name: "speak",
  aliases: ["s", "sua"],
  category: "fun",
  run: async (client, message, args) => {
    const channel = message.member.voice.channel;

    if (!args[0])
      return message.channel.send("Nhập gì đó đi tao mới nói được ?");

    const string = args.join(" ");

    if (string.length > 200)
      return message.channel.send("M nói nhiều v, nói ít thôi ?");

    if (!channel)
      return message.reply("Mày không vô phòng thì tao nói cho ai nghe?");

    try {
      const audioURL = await getAudioUrl(string, {
        lang: "vi",
        slow: false,
        host: "https://translate.google.com",
        timeout: 10000,
      });

      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();
      connection.subscribe(player);
      const resource = createAudioResource(`${audioURL}`);
      console.log(audioURL);
      player.play(resource);
    } catch (e) {
      message.channel.send("Tao bị lỗi rồi, m gọi Tính Trần cứu tao đi !");
      console.error(e);
    }
  },
};
