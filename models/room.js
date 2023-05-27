var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
  room_name: String,
  room_id: String,
  password: String,
});
var userModels = mongoose.model("user", user);
module.exports = userModels;
