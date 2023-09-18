const Tutorial = require("../model/tutorial.model");

module.exports = {
  createTuto: async (req, res, next) => {
    const tuto = req.body;
    try {
      if (!tuto.title || !tuto.description ) return next(400);
      const newT = await Tutorial.create(req.body);
      return res.json(newT);
    } catch (error) {
      return next(404);
    }
  }
};