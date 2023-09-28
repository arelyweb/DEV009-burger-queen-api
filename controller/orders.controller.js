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
    },
    getOrder: async (req, res, next) => {
      const page = parseInt(req.query._page)|| 1;
      const limit = parseInt(req.query._limit)|| 10;
      
      const startI = (page-1) * limit;
      const endI = page * limit;
  
      const result = {}
      result.next = {
        page: page+ 1,
        limit: limit
      };
      
      result.previous = {
        page: page - 1,
        limit: limit
      };
      try {
      const orders = await Order.find()
      .populate('products.productId')
      .exec();
      const numberOfPages = Math.ceil(Order.length / limit);
      const response = {};
  
      response.pagination = {
        page: page,
        pageSize: limit,
        numberOfPages: numberOfPages,
      };
      
      if (startI > 0) {
        response.link = {
          first: `/orders?_page=1&_limit=${limit}`,
          prev: `/orders?_page=${page - 1}&_limit=${limit}`,
        };
      }
     
      if (endI < orders.length) {
        response.link = {
          ...response.link,
          next: `/orders?_page=${page + 1}&_limit=${limit}`,
          last: `/orders?_page=${numberOfPages}&:_limit=${limit}`,
        };
      }
     
      response.result = orders.slice(startI, endI);
      
      return res.json(response); 
    } catch (err) {
      return next(404);
    }
   }
 };
