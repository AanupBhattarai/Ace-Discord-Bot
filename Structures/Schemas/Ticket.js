const { model, Schema } = require("mongoose");

module.exports = model(
  "Ticket",
  new Schema({
    GuildID: String,
    MembersID: [String],
    TicketID: String,
    ChannelID: String,
    Closed: String,
    Locked: String,
    Type: String,
    Claimed: Boolean,
    ClaimedBy: String,
  })
);
