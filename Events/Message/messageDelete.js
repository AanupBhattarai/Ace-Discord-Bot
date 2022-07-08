const { MessageEmbed, Message, WebhookClient } = require("discord.js");
// const { MessageLoggerURL } = require("../../Structures/config.json");

module.exports = {
  name: "messageDelete",
  /**
   *
   * @param {Message} message
   */
  execute(message) {
    if (message.author.bot) return;

    const LogDeleteEmbed = new MessageEmbed();
    LogDeleteEmbed.setColor("ORANGE")
      .setDescription(
        `A [message](${message.url}) by ${message.author} in ${
          message.channel
        } was **deleted**\n
      **Deleted Message**: \`\`\` ${
        message.content ? message.content : "None"
      }\`\`\``.slice(0, 4096)
      )
      .setTimestamp();

    if (message.attachments.size >= 1) {
      LogDeleteEmbed.addField(
        "Attachments: ",
        `[Link](${message.attachments.map((a) => a.url)})`,
        true
      );
    }
    new WebhookClient({
      url: `${process.env.MessageLoggerURL}`,
    })
      .send({ embeds: [LogDeleteEmbed] })
      .catch((err) => {
        console.log(err);
      });
  },
};
