const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js");
const { GuildCacheID } = require("../../Structures/config.json");

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("Slash Commands Loaded");

  CommandsArray = [];

  (await PG(`${process.cwd().replace(/\\/g, "/")}/SlashCommands/*/*.js`)).map(
    async (file) => {
      const command = require(file);

      if (!command.name)
        return Table.addRow(file.split("/")[7], "❌ FAILED", "Missing a name.");

      if (!command.context && !command.description)
        return Table.addRow(
          command.name,
          "❌ FAILED",
          "Missing a description."
        );

      if (command.permission) {
        if (Perms.includes(command.permission))
          command.defaultPermission = false;
        else
          return Table.addRow(
            command.name,
            "❌ FAILED",
            "Permission is invalid."
          );
      }

      client.commands.set(command.name, command);
      CommandsArray.push(command);

      await Table.addRow(command.name, "✔️ SUCCESSFUL");
    }
  );
  console.log(Table.toString());

  client.on("ready", async () => {
    const mainGuild = await client.guilds.cache.get(GuildCacheID);
    mainGuild.commands.set(CommandsArray);
  });
};
