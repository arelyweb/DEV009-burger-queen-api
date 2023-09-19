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
  getUsers: async (req, resp, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
    try {
      const usr = await User.find();
      if (!usr) {
          return res.json({ message: 'No user found' })
      }
      return res.json({ user: usr })
  } catch (error) {
      return res.json({ error: error });
  }
  },
};
