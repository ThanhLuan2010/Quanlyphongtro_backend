var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
  name: String,
  user_id: String,
  password: String,
});
var userModels = mongoose.model("user", user);
module.exports = userModels;
