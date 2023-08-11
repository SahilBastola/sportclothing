const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//model for login user
const contactSchema = mongoose.Schema(
  {
    Fullname: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Contacts = mongoose.model("contacts", contactSchema)
module.exports = Contacts