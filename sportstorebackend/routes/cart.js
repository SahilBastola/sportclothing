const express = require("express");
const {  createCart,
    updateCart,
    deleteCart,
    getAllCart,
    getCart,
    getCartByUserId,
    deleteAllCart,} = require("../Controllers/cart");
const { verifyAdmin, verifyUser ,verifyToken} = require("../Middleware/verifyToken")
const router = express.Router();


//update
router.post("/createCart",verifyToken, createCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);
router.delete("/", deleteAllCart);
router.get("/", getAllCart);
router.get("/mycart", verifyToken,getCartByUserId);
router.get("/getcart", getCart);


module.exports = router;