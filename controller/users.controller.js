var mongoosePaginate = require('mongoose-paginate');
const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const {
  idOrEmail
} = require ("../utils/util")
module.exports = {
  createUser: async (req, res, next) => {
    const user = req.body;
    try {
      if (!user.email || !user.password ) return next(400);

      const userFound = await User.findOne({ email: user.email });
      if (userFound) return next(403);

      user.password = bcrypt.hashSync(user.password, 10);

      const newT = await User.create(user);
      return res.json({
        _id: newT._id,
        email: newT.email,
        role: newT.role,
      });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  getUsers: async (req, res, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
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
    const users = await User.find();
    const numberOfPages = Math.ceil(users.length / limit);
    const response = {};

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
    response.result = users.slice(startI, endI).map((user) => ({
      id: user._id,
      email: user.email,
      role: user.role,
    }));

    return res.json(response); 


    } catch (err) {
      return res.json({ error: err.message });
    }
  },
  getOneUser: async(req, res, next) => {
    const userQ = idOrEmail(req.params.uid);
    try{

      const user = await User.findOne(userQ).lean();//sin metodos del mongodb
   
      return res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
      });

    }catch(err){
      return res.json({ error: err.message});
    }
  },
};
