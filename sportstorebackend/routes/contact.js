const express = require("express");
const {
    createContact, deleteContact,getAllContact,updateContact
} = require("../Controllers/contact");
const { verifyAdmin, verifyUser ,verifyToken} = require("../Middleware/verifyToken")
const router = express.Router();


//update
router.put("/:id", updateContact);
router.post("/createcontact", createContact);
router.get("/", getAllContact);
router.delete("/:id", deleteContact);


module.exports = router;