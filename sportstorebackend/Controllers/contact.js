const multer = require("multer");
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const Contacts = require('../Models/contact');


//create or add Product
const createContact = async (req, res, next) => {
    const newContact = new Contacts({
        Fullname: req.body.Fullname,
        Email: req.body.Email,
        Address: req.body.Address,
        Description: req.body.Address,
      });
      try {
        const savedProduct = await newContact.save();
        res.status(200).json({
          success : true,
          message:"Contact",
          data: savedProduct
          
        });
      } catch (error) {
        next(error);
      }
  };


const getAllContact = async(req, res, next) => {
    try {
        const contacts = await Contacts.find(

        );

        res.status(200).json(
           
             contacts
        )
    } catch (error) {
        next(error)
    }

}



const updateContact = async(req, res, next) => {
  try {
      const updatedcontact = await Contacts.findByIdAndUpdate(
          req.params.id, { $set: req.body }, { new: true }
      );

      res.status(200).json(updatedcontact)
  } catch (error) {
      next(error)
  }
}


const deleteContact = async(req, res, next) => {
    try {
        const updatedcontact = await Contacts.findByIdAndDelete(
            req.params.id,
        );

        res.status(200).json("contact has been Deleted")
    } catch (error) {
        next(error)
    }
}










module.exports = {createContact, deleteContact,getAllContact,updateContact}