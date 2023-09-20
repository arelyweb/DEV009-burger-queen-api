var mongoosePaginate = require('mongoose-paginate');
const User = require("../model/user.model");
const bcrypt = require('bcrypt');
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
      return next(404);
    }
  },
  getUsers: async (req, res, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
    const page = parseInt(req.query._page);
    const limit = parseInt(req.query._limit);

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
    const users = await User.find()
    .select('email role')
      .limit(limit)
      .skip(startI)
      .exec();

      res.json(users);

    } catch (err) {
      console.error(err.message);
    }
  },
};
