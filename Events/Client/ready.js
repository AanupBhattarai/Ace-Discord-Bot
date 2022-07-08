const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  execute(client) {
    console.log("The bot is online now!");
    client.user.setActivity("Hello!", { type: "WATCHING" });

    require("../../Systems/LockDownSys");

    if (!Database || !process.env.Database) return;
    mongoose
      .connect(Database || process.env.Database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("The client is now connected to the database.");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
