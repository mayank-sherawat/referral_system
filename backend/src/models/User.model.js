const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  userNumber: {
  type: Number,
  unique: true
},


  referralCode: { type: String, unique: true },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  directReferrals: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  earnings: {
    direct: { type: Number, default: 0 },
    indirect: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model("User", UserSchema);
