const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default: "uploads\\user\\pic-1689003691565.png",
    },
    isAdmin: {
      type: String,
      required: true,
      default: "false",
    },
    comments: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        text: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", userSchema);
