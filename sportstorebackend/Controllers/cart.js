const Cart = require("../Models/Cart");

// Create cart
const jwt = require('jsonwebtoken');


const createCart = async (req, res, next) => {
  try {
    const userid = req.query.userid;
    const productid = req.query.productid;
    
    let cart = await Cart.findOne({ userid: userid });

    if (!cart) {
      // If no cart exists for the user, create a new cart
      cart = new Cart({
        userid: userid,
        items: []
      });
    }

    const cartItem = cart.items.find((item) => item.productid === productid);

    if (cartItem) {
      // If the product already exists in the cart, update the quantity
      cartItem.quantity += 1;
    } else {
      // If the product does not exist in the cart, create a new cart item
      const newCartItem = {
        productid: productid,
        quantity: 1
      };
      cart.items.push(newCartItem);
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Get all carts
const getAllCart = async (req, res, next) => {
  try {
    const carts = await Cart.find()
      .populate("userid")
      .populate("items.productid");
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

// Delete cart by ID
const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.status(200).json("Cart item has been deleted");
  } catch (error) {
    next(error);
  }
};

// Update cart by ID
const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(id);

    if (!cart) {
      throw new Error("Cart item not found.");
    }

    cart.items.forEach((item) => {
      if (item._id.toString() === id) {
        item.quantity = parseInt(quantity);
      }
    });

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
};

// Get cart by ID
const getCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id).populate("items.productid");
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const getCartByUserId = async (req, res, next) => {
  try {
    const userid = req.query.userid;
    console.log(userid)
    const cart = await Cart.findOne({ userid }).populate("items.productid");
    
    if (!cart) {
      // If no cart exists for the user, you can handle it based on your requirements
      // For example, you can return an empty array or throw an error
      return res.status(404).json({ message: "Cart not found" });
    }
    
    const cartItems = cart.items;
    res.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
};





// Delete all carts
const deleteAllCart = async (req, res, next) => {
  try {
    await Cart.deleteMany();
    res.status(200).json("All cart items have been deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getAllCart,
  getCart,
  getCartByUserId,
  deleteAllCart,
};
