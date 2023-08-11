const Orders = require("../Models/Order");
const Cart = require("../Models/Cart");

const createOrder = async (req, res, next) => {
  try {
    const { userId, cartItems, location, phone, email } = req.body;

    if (!userId) {
      throw new Error("userId is required");
    }

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart items are empty");
    }

    const orderPromises = cartItems.map(async (item) => {
      const { productId, quantity } = item;

      if (!productId) {
        throw new Error("productId is required");
      }

      // Create a new order
      const newOrder = new Orders({
        userId,
        productId,
        quantity,
        location,
        phone,
        email,
      });

      // Save the order
      return newOrder.save();
    });

    // Wait for all order promises to resolve
    const orders = await Promise.all(orderPromises);

    res.json({ message: "Orders created successfully", orders });
  } catch (error) {
    next(error);
  }
};

const getAllOrder = (req, res, next) => {
  Orders.find()
    .populate("userId")
    .populate("productId")
    .then((orders) => {
      res.status(200).json({
        success: true,
        message: "List of All Cart Products",
        data: orders,
      });
    })
    .catch(next);
};

const deleteAllOrder = (req, res, next) => {
  Orders.deleteMany()
    .then((reply) => {
      res.json(reply);
    })
    .catch(console.log);
};

const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Orders.findByIdAndUpdate(
      orderId,
      { $set: { verified: true } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};


const deleteOrder = async (req, res, next) => {
  try {
    await Orders.findByIdAndDelete(req.params.id);

    res.status(200).json("Order has been deleted");
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const  orders =await   Orders.find()
    .populate("userId")
    .populate("productId")

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrdersByUserId = async (req, res, next) => {
  try {
    const userId = req.query.userId; // Retrieve userId from query parameters
    const orders = await Orders.find({ userId })
      .populate("userId")
      .populate("productId");

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  getOrdersByUserId,
  deleteAllOrder,
};
