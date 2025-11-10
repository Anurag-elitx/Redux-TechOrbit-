const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true
    },
    password: { 
      type: String, 
      required: true 
    },
    isAdmin: { type: Boolean, default: false },
    img: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
