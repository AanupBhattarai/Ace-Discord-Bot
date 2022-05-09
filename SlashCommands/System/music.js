const { CommandInteraction, MessageEmbed, Client } = require("discord.js");

module.exports = {
  name: "music",
  description: "Complete Music System.",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "play",
      description: "Play a song.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "query",
          description: "Provide a name or url for the song.",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "volume",
      description: "Alter the volume.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "percent",
          description: "10 = 10%",
          type: "NUMBER",
          required: true,
        },
      ],
    },
    {
      name: "settings",
      description: "Select an option.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "options",
          description: "Select an option.",
          type: "STRING",
          required: true,
          choices: [
            {
              name: "🔢 View Queue",
              value: "queue",
            },
            {
              name: "⏭️ Skip Song",
              value: "skip",
            },
            {
              name: "⏸️ Pause Song",
              value: "pause",
            },
            {
              name: "⏯️ Resume Song",
              value: "resume",
            },
            {
              name: "⏹️ Stop Music",
              value: "stop",
            },
            {
              name: "🔀 Shuffle Queue",
              value: "shuffle",
            },
            {
              name: "🔁 Toggle Autoplay Modes",
              value: "AutoPlay",
            },
            {
              name: "🈁 Add a Related Song",
              value: "RelatedSong",
            },
            {
              name: "🔂 Toggle Repeat Mode",
              value: "RepeatMode",
            },
          ],
        },
      ],
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options, member, guild, channel } = interaction;
    const VoiceChannel = member.voice.channel;

    if (!VoiceChannel)
      return interaction.reply({
        contents:
          "You must be in a voice channel to be able to use the music commands.",
      });

    if (
      guild.me.voice.channelId &&
      VoiceChannel.id !== guild.me.voice.channelId
    )
      return interaction.reply({
        contents: `I am already playing music in <#${guild.me.voice.channelId}>.`,
      });

    try {
      switch (options.getSubcommand()) {
        case "play": {
          client.distube.play(VoiceChannel, options.getString("query"), {
            textChannel: channel,
            member: member,
          });

          return interaction.reply({ content: "🪄 Request received" });
        }

        case "volume": {
          const Volume = options.getNumber("percent");
          if (Volume > 100 || Volume < 1)
            return interaction.reply({
              content: "You have to specify a number between 1 to 100.",
            });

          client.distube.setVolume(VoiceChannel, Volume);

          return interaction.reply({
            content: `⚡ Volume has been set to \`${Volume}%\``,
          });
        }

        case "settings": {
          const queue = await client.distube.getQueue(VoiceChannel);

          if (!queue)
            return interaction.reply({ content: "⛔ There is no queue." });

          switch (options.getString("options")) {
            case "skip":
              await queue.skip(VoiceChannel);
              return interaction.reply({
                content: "⏭️ Song has been skipped.",
              });

            case "stop":
              await queue.stop(VoiceChannel);
              return interaction.reply({
                content: "⏹️ Music has been stopped",
              });

            case "pause":
              await queue.pause(VoiceChannel);
              return interaction.reply({
                content: "⏸️ Song has been paused.",
              });

            case "resume":
              await queue.resume(VoiceChannel);
              return interaction.reply({
                content: "⏯️ Song has been resumed.",
              });

            case "shuffle":
              await queue.shuffle(VoiceChannel);
              return interaction.reply({
                content: "🔀 The queue has been shuffled.",
              });

            case "AutoPlay":
              let Mode = await queue.toggleAutoplay(VoiceChannel);
              return interaction.reply({
                content: `🔁 Autoplay Mode is set to ${Mode ? "On" : "Off"}`,
              });

            case "RelatedSong":
              await queue.addRelatedSong(VoiceChannel);
              return interaction.reply({
                content: "🈁 A related song has been added to the queue.",
              });

            case "RepeatMode":
              let Mode2 = await client.distube.setRepeatMode(queue);
              return interaction.reply({
                content: `🔂 Repeat Mode is set to ${
                  Mode2 - Mode2 ? (Mode2 == 2 ? "Queue" : "Song") : "Off"
                }`,
              });

            case "queue":
              return interaction.reply({
                embeds: [
                  new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(
                      `${queue.songs.map(
                        (song, id) =>
                          `\n**${id + 1}**. ${song.name} - \`${
                            song.formattedDuration
                          }\``
                      )}`
                    ),
                ],
              });
          }
          return;
        }
      }
    } catch (e) {
      const errorEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`⚠️ Alert : ${e}`);
      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
