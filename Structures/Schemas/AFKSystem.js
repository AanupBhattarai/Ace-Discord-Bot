const { model, Schema } = require("mongoose");

module.exports = model(
  "AFK",
  new Schema({
    GuilID: String,
    UserID: String,
    Status: String,
    Time: String,
  })
);
