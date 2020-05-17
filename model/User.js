const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true
  },

  password: String
});

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model("user", UserSchema);
module.exports = User;
