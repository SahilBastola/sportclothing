const verifyOrder = require("../Models/verifyorder");
const orders = require("../Models/verifyorder");


const verifyorder = async (req, res, next) => {

    console.log(req.query)
      const Orderlid = req.query.orderid;
      console.log(Orderlid)
      console.log(Orderlid)
      if(!Orderlid) {
        return res.status(400).json({
          message: 'Order id is required'
        });
      }
      const newOrder = new verifyOrder({
        orderid: req.query.orderid,
          location : req.query.location ,
           phone : req.query.phone ,
           checkInDate :req.query.checkInDate ,
            checkOutDate : req.query.checkOutDate
  
      });
    
      try {
        // Add this line to validate the order before saving it
        await newOrder.validate();
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
      } catch (error) {
          console.log(error);
        next(error);
      }
    };

  const getAllverifyOrder = (req, res, next) => {
    verifyOrder.find()
      .populate("orderid")
      .then((orders) => {
        res.status(200).json({
          success: true,
          message: "List of All verofied order",
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




const updateOrder = async(req, res, next) => {
    try {
        const updatedOrder = await Orders.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );

        res.status(200).json(updateOrder)
    } catch (error) {
        next(error)
    }
}


const deleteOrder = async(req, res, next) => {
    try {
        const updatedOrder = await Orders.findByIdAndDelete(
            req.params.id,
        );

        res.status(200).json("Order been Deleted")
    } catch (error) {
        next(error)
    }
}


const getOrder = async(req, res, next) => {
    try {
        const ProductOrders = await Orders.find(
          req.params.id,
        );

        res.status(200).json(ProductOrders)
    } catch (error) {
        next(error)
    }
}


const getOrdersByUserId = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const orders = await Orders.find({ userid: userId })
      .populate("userid")
      .populate("Productid")
      .then((orders) => {
        if (res.status) {
          res.status(201).json({
            success: true,
            message: "List of All Cart Products",
            data: orders,
          });
        }
      })
      .catch(next);
      
      if (orders.length === 0) {
        return res.status(404).json({ msg: "No orders found for this user" });
      }
  
      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server error" });
    }
  }


module.exports = { verifyorder,updateOrder, deleteOrder, getAllverifyOrder, getOrder,getOrdersByUserId ,deleteAllOrder}