const { MessageEmbed, Message, WebhookClient } = require("discord.js");
const { MessageLoggerURL } = require("../../Structures/config.json");

module.exports = {
  name: "messageUpdate",
  /**
   *
   * @param {Message} oldMessage
   * @param {Message} newMessage
   */
  execute(oldMessage, newMessage) {
    if (oldMessage.author.bot) return;

    if (oldMessage.content === newMessage.content) return;

    const Count = 1950;
    const Original =
      oldMessage.content.slice(0, Count) +
      (oldMessage.content.length > Count ? " ..." : "");
    const Edited =
      newMessage.content.slice(0, Count) +
      (newMessage.content.length > Count ? " ..." : "");

    const LogEmbed = new MessageEmbed();
    LogEmbed.setColor("ORANGE")
      .setDescription(
        `A [message](${newMessage.url}) has been edited by ${newMessage.author} in ${newMessage.channel}.\n
        **Original**: \`\`\` ${Original}\`\`\`
        **Edited**: \`\`\` ${Edited}\`\`\` `.slice("0", "4096")
      )
      .setFooter({
        text: `Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}`,
      })
      .setTimestamp();
    if (newMessage.attachments.size > 0) {
      LogEmbed.addField(
        "Attachments: ",
        `[Link](${newMessage.attachments.map((a) => a.url)})`,
        true
      );
    }
    new WebhookClient({
      url: `${MessageLoggerURL}`,
    })
      .send({ embeds: [LogEmbed] })
      .catch((err) => {
        console.log(err);
      });
  },
};
