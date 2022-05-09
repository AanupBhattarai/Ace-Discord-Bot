const { GuildMember, MessageEmbed, MessageAttachment } = require("discord.js");
const canvas = require("canvas");

module.exports = {
  name: "guildMemberUpdate",
  /**
   * @param {GuildMember} oldMember
   * @param {GuildMember} newMember
   */
  execute(oldMember, newMember) {
    const { guild } = newMember;

    const ThankYou = new MessageEmbed().setColor("PURPLE").setAuthor({
      name: "SERVER BOOSTED",
      iconURL: guild.iconURL({ dynamic: true, size: 512 }),
    });

    if (!oldMember.premiumSince && newMember.premiumSince) {
      const canvas = Canvas.createCanvas(800, 250);
      const ctx = canvas.getContext("2d");

      const background = Canvas.loadImage(
        "../Structures/Images/boost-image.png"
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#9B59B6";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      ctx.font = "38px cursive";
      ctx.textAlign = "center";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(
        newMember.displayName,
        canvas.width / 2,
        canvas.height / 1.2
      );

      const avatar = Canvas.loadImage(
        newMember.user.displayAvatarURL({ format: "jpg" })
      );

      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, 25, 25, 200, 200);

      const attachment = new MessageAttachment(
        canvas.toBuffer(),
        "boost-image.png"
      );

      ThankYou.setDescription(`Thank you for boosting the server!`);
      ThankYou.setImage("attachment://boost-image.png");

      guild.systemChannel
        .send({ embeds: [ThankYou], files: [attachment] })
        .catch((err) => {
          console.log(err);
        });

      ThankYou.setDescription(
        `Thank you for boosting the server! Your support is much appreciated!`
      );
      newMember.send({ embeds: [ThankYou] });
    }
  },
};
