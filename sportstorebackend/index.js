const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const verifyroute = require('./routes/verifyorder');
const contactRoutes = require('./routes/contact')
const { notFound, errorHandler } = require('./Middleware/errorMiddleware');
const colors = require('colors');
const { connectDB } = require('./db/connection');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
// Connect to MongoDB
connectDB()
  .then(() => {
    // Routes
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use("/product", productRoutes);
    app.use("/order", orderRoutes);
app.use("/contact", contactRoutes);
app.use("/cart", cartRoutes);
app.use("/verify", verifyroute);
    // Error Middleware
    app.use(notFound);
    app.use(errorHandler);

    // Default route
    app.get('/', (req, res) => {
      res.send('Under Construction');
    });

    // Start the server
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
    process.exit(1);
  });
