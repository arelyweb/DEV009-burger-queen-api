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
  },
  getProduct: async (req, res, next) => {
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
    const products = await Product.find();
    const numberOfPages = Math.ceil(products.length / limit);
    const response = {};

    console.log(products)

    response.pagination = {
      page: page,
      pageSize: limit,
      numberOfPages: numberOfPages,
    };

    if (startI > 0) {
      response.link = {
        first: `/products?page=1&limit=${limit}`,
        prev: `/products?page=${page - 1}&limit=${limit}`,
      };
    }

    if (endI < users.length) {
      response.link = {
        ...response.link,
        next: `/products?page=${page + 1}&limit=${limit}`,
        last: `/products?page=${numberOfPages}&limit=${limit}`,
      };
    }
    response.result = products.slice(startI, endI).map((produc) => ({
      id: produc._id,
      email: produc.email,
      role: produc.role,
    }));

    return res.json(response); 


    } catch (err) {
      return next(404);
    }
  }
};