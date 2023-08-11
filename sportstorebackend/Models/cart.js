const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true, // Ensures uniqueness of productid within the cart
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema], // Array of cart items
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
