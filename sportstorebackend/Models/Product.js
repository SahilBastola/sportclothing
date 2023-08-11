const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//model for login user
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String], // Define the field as an array of strings
    },
    featured: {
      type: Boolean,
      default: true,
    },
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
      },
    ],
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        value: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const product = mongoose.model("Product", productSchema)
module.exports = product