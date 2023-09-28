const Order = require("../model/order.model");
const Product = require("../model/product.model");

const {
    idOrEmail
  } = require ("../utils/util");

  module.exports = {
     createOrder: async (req, res, next) => {
      const order = req.body;
      if (!order.products || order.products.length === 0) return next(400);
      const newOrder = new Order({
        ...req.body,
        products: req.body.products.map((product) => ({
          qty: product.qty,
          productId: product.productId,
        })),
      });
      try {
        const newOrderSaved = await newOrder.save();
    
        const populatedOrder = await Order.findById(newOrderSaved._id)
        .populate('products.productId')
        .exec();
    
        return res.json(populatedOrder);
      } catch (error) {
        return next(error);
      }
    }

 };
