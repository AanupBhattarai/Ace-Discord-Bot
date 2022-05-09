const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/AFKSystem");

module.exports = {
  name: "afk",
  description: "A multi-guild AFK system.",
  options: [
    {
      name: "set",
      type: "SUB_COMMAND",
      description: "Set your AFK status.",
      options: [
        {
          name: "status",
          description: "set your status.",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "return",
      type: "SUB_COMMAND",
      description: "Return from being AFK.",
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { guild, options, user, createdTimestamp } = interaction;

    const Embed = new MessageEmbed().setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL({ dynamic: true }),
    });

    const afkStatus = options.getString("status");
  },
};
