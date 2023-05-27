var user = require("../models/user");

module.exports = {
  //thay đổi thoog tin
  updateInfo: (user_id, body) => {
    return user.updateOne({ user_id: user_id }, body);
  },
};
