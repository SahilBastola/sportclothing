const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
  addProductRating,
  addProductComment,
} = require("../Controllers/product");

const router = express.Router();
router.put("/:id", updateProduct);
router.post("/createhostel", createProduct);
router.get("/", getAllProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProduct);
router.post("/:id/addreview", addProductRating); // Add route for adding a review
router.post("/:id/addcomment", addProductComment); // Add route for adding a comment
router.get("/search", searchProduct);





module.exports = router;
