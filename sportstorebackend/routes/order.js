const express = require("express");
const {createOrder, updateOrder, deleteOrder, getAllOrder, getOrder,getOrdersByUserId,deleteAllOrder} = require("../Controllers/order");
const { verifyAdmin, verifyUser ,verifyToken} = require("../Middleware/verifyToken")
const router = express.Router();


//update
router.post("/createOrder",verifyToken, createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.delete("/", deleteAllOrder);
router.get("/myorder", verifyToken,getOrdersByUserId);
router.get("/getorderss", getOrder);


module.exports = router;