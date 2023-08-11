const user = require("../Models/userModel")
const upload = require('../Middleware/upload');
const updateUser = async (req, res, next) => {
    upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: 'Profile picture upload failed' });
        return;
      }
  
      try {
        const { username, email, password, isAdmin } = req.body;
        const updatedFields = {
          username,
          email,
          password,
          isAdmin,
        };
  
        if (req.file) {
          updatedFields.pic = req.file.path;
        }
  
        const updatedUser = await user.findByIdAndUpdate(
          req.params.id,
          { $set: updatedFields },
          { new: true }
        );
  
        res.status(200).json(updatedUser);
      } catch (error) {
        if (error.name === 'ValidationError') {
          const validationErrors = Object.values(error.errors).map((err) => err.message);
          res.status(400).json({ message: 'Invalid user data', errors: validationErrors });
        } else if (error.name === 'MongoError' && error.code === 11000) {
          res.status(409).json({ message: 'Duplicate key error. User already exists.' });
        } else {
          res.status(500).json({ message: 'Update failed', error: error.message });
        }
      }
    });
  };
  
  


const deleteUser = async(req, res, next) => {
    try {
        const updatedUser = await user.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json("user has been Deleted")
    } catch (error) {
        next(error)
    }
}


const getUsers = async(req, res, next) => {
    try {
        const users = await user.find(  

        );

        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const getUser = async(req, res, next) => {
    try {
        const users = await user.findById(
            req.params.id
        );

        res.status(200).json(
           [users]
        )
    } catch (error) {
        next(error)
    }
}

const createComment = async (req, res, next) => {
  try {
    const { userId, productId, text } = req.body;

    // Create the comment object
    const comment = {
      productId,
      text,
    };

    // Find the user by userId and push the comment to their comments array
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $push: { comments: comment } },
      { new: true }
    );

    res.status(201).json({ comment, user: updatedUser });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

module.exports = { updateUser, deleteUser, getUser, getUsers,createComment }