const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const verifyOrderSchema = new mongoose.Schema(
  {

    orderid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required:true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    location: {
        type:String,
        required: true
    },
    phone: {
        type:String,
        required: true
    }
    
  },
  { timestamps: true }
);

const Orders = mongoose.model("verifyOrder", verifyOrderSchema);
module.exports = Orders;
