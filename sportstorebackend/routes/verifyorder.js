const express = require("express");
const {verifyorder,updateOrder, deleteOrder, getAllverifyOrder, getOrder,getOrdersByUserId ,deleteAllOrder} = require("../controllers/verifyOrder");
const { verifyAdmin, verifyUser ,verifyToken} = require("../Middleware/verifyToken")
const router = express.Router();


//update
router.post("/verifyOrder",verifyToken, verifyorder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.delete("/", deleteAllOrder);
router.get("/", getAllverifyOrder);
router.get("/myorder", verifyToken,getOrdersByUserId);
router.get("/getorderss", getOrder);


module.exports = router;