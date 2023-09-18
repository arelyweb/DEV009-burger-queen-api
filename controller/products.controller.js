const Product = require("../model/product.model");

module.exports = {
  createProduct: async (req, res, next) => {
    const product = req.body;
    try {
      if (!product.name || !product.price ) return next(400);
      const newT = await Product.create(req.body);
      return res.json(newT);
    } catch (error) {
      return next(404);
    }
  }
};