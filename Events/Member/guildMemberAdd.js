const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const {
  WelcomerID,
  WelcomerToken,
  MemberRole,
} = require("../../Structures/config.json");

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member;

    member.roles.add(MemberRole);

    const Welcomer = new WebhookClient({
      id: WelcomerID,
      token: WelcomerToken,
    });

    const Welcome = new MessageEmbed()
      .setColor("AQUA")
      .setAuthor({
        name: user.tag,
        iconURL: user.avatarURL({ dynamic: true, size: 512 }),
      })
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `Welcome ${member} to the **${guild.name}**!\n
      Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
      Latest Member Count: **${guild.memberCount}**`
      )
      .setFooter({ text: `ID: ${user.id}` });

    Welcomer.send({ embeds: [Welcome] });
  },
};
