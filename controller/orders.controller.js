const Order = require("../model/order.model");
const Product = require("../model/product.model");

const {
    idOrEmail
  } = require ("../utils/util");

  module.exports = {
  createOrder: async (req, res, next) => {

      const order = req.body;

      try {
        if (!order.products || order.products.length === 0 || !order.userId) return next(400);

        const newOrder = new Order({
          ...req.body,
          products: req.body.products.map((product) => ({
            qty: product.qty,
            productId: product.productId,
          })),
        });

        const newOrderSaved = await newOrder.save();
    
        const populatedOrder = await Order.findById(newOrderSaved._id)
        .populate('products.productId')
        .exec();
    
        return res.json(populatedOrder);
      } catch (error) {
        return next(404);
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
      res.append('pagination', response.pagination);
      
      if (startI > 0) {
        // response.link = {
        //   first: `/orders?_page=1&_limit=${limit}`,
        //   prev: `/orders?_page=${page - 1}&_limit=${limit}`,
        // };
        res.append('fist', `/orders?_page=1&_limit=${limit}`)
        res.append('prev', `/orders?_page=${page - 1}&_limit=${limit}`)
      }
     
      if (endI < orders.length) {
        // response.link = {
        //   ...response.link,
        //   next: `/orders?_page=${page + 1}&_limit=${limit}`,
        //   last: `/orders?_page=${numberOfPages}&:_limit=${limit}`,
        // };
        res.append('next', `/orders?_page=${page + 1}&_limit=${limit}`)
        res.append('last', `/orders?_page=${numberOfPages}&_limit=${limit}`)
      }
     
      response.result = orders.slice(startI, endI);
      
      return res.json(response.result); 

    } catch (err) {
      return next(404);
    }
  },
  getOneOrder: async(req, res, next) => {
    const orderQ = req.params.orderId;
    try{

      const order = await Order.findById(orderQ)
      .populate('products.productId')
      .exec();
   
      return res.json(order);

    }catch(err){
      return next(404)
    }
  },
  updateOrder: async(req, res, next) =>{
    const orderQ = req.params.orderId;

    const orderUp = {
      status: req.body.status
    }
    
    try {

      if (!orderUp) return next(400);
    
      const newProduct = await Order.findByIdAndUpdate(orderQ, orderUp, {
        new: true
      }).populate('products.productId')
      .exec();;

      return res.json(newProduct);

    } catch (error) {
      return next(404);
    }

  },
  deleteOrder: async(req, res, next) =>{
    const orderQ = req.params.orderId;

    try {

      const orderFound = await Order.findById( orderQ);
      console.log(orderFound)
      if (!orderFound) return next(404);

      const deleteO = await Order.findByIdAndDelete(orderQ)
      .populate('products.productId')
      .exec();

      return res.json(deleteO);
   }
   catch(e){
    return next(404);
   }
 }
 };
