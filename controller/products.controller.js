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

    response.pagination = {
      page: page,
      pageSize: limit,
      numberOfPages: numberOfPages,
    };
    
    if (startI > 0) {
      response.link = {
        first: `/products?_page=1&_limit=${limit}`,
        prev: `/products?_page=${page - 1}&_limit=${limit}`,
      };
    }
   
    if (endI < products.length) {
      response.link = {
        ...response.link,
        next: `/products?_page=${page + 1}&_limit=${limit}`,
        last: `/products?_page=${numberOfPages}&:_limit=${limit}`,
      };
    }
   
    response.result = products.slice(startI, endI).map((produc) => ({
      _id: produc._id,
      name: produc.name,
      price:produc.price,
      image:produc.image,
      type:produc.type,
      createdAt: produc.createdAt
    }));
    
    return res.json(response); 

    } catch (err) {
      return next(404);
    }
  },
  getOneProduct: async(req, res, next) => {
    const productQ = req.params.uid;
    try{

      const product = await Product.findOne(productQ).lean();//sin metodos del mongodb
   
      return res.json({
        _id: product._id,
        name: product.name,
        price:product.price,
        image:product.image,
        type:product.type,
        createdAt: product.createdAt
      });

    }catch(err){
      return next(404).json('message: No found user.');
    }
  },
  updateProduct: async(req, res, next) =>{
    const product = req.params.uid;

    const productUp = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      type: req.body.type,
    }
    

    try {
    
      const newProduct = await Product.findOneAndUpdate(product, productUp, {
        new: true
      });

      return res.json({
        _id: newProduct._id,
        name: newProduct.name,
        price:newProduct.price,
        image:newProduct.image,
        type:newProduct.type,
        createdAt: newProduct.createdAt
      });

    } catch (error) {
      return next(404);
    }

  },
  deleteProduct: async(req, res, next) =>{
    const product = req.params.productId;

    try {
      const deleteProduct =await Product.findOneAndDelete(product).lean();

      return res.json({
        _id: deleteProduct._id,
        name: deleteProduct.name,
        price:deleteProduct.price,
        image:deleteProduct.image,
        type:deleteProduct.type,
        createdAt: deleteProduct.createdAt
      });
   }
   catch(e){
    return next(404);
   }
  }
};