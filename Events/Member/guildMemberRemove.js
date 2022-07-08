const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const {
  LeftLoggerID,
  LeftLoggerToken,
} = require("../../Structures/config.json");

module.exports = {
  name: "guildMemberRemove",
  /**
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member;

    const LeftLogger = new WebhookClient({
      id: LeftLoggerID,
      token: LeftLoggerToken,
    });

    const Left = new MessageEmbed()
      .setColor("RED")
      .setAuthor({
        name: user.tag,
        iconURL: user.avatarURL({ dynamic: true, size: 512 }),
      })
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `${member} has left the community!\n
      Joined Date: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n
      Latest Member Count: **${guild.memberCount}**`
      )
      .setFooter({ text: `ID: ${user.id}` });

    LeftLogger.send({ embeds: [Left] });
  },
};
