const User = require("../model/user.model");
module.exports = {
  createUser: async (req, res, next) => {
    const user = req.body;
    console.log(user);
    try {
      if (!user.email || !user.password ) return next(400);
      const newT = await User.create(req.body);
      return res.json(newT);
    } catch (error) {
      return next(404);
    }
  },
  getUsers: (req, resp, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
  },
};
