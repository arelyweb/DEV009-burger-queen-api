const User = require("../model/user.model");
const {
    idOrEmail
  } = require ("../utils/util");

  module.exports = {
    createOrder: async (req, res, next) => {
      const order = req.body;
      try {
        if (!order.email || !order.password ) return next(400);
  
        const userFound = await User.findOne({ email: order.email });
        if (userFound) return next(403);
  
  
        const newT = await User.create(order);
        return res.json({
          _id: newT._id,
          email: newT.email,
          role: newT.role,
        });
      } catch (error) {
        return res.json({ error: error.message });
      }
    },
};