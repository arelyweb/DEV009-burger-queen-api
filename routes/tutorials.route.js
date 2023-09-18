const {
  requireAuth,
  requireAdmin,
} = require('../middleware/auth');
const {
  createTuto,
} = require('../controller/tutorials.controller');

module.exports = (app, nextMain) => {
    // Create a new Tutorial
    app.post("/tutorials",  createTuto);
  
    nextMain();
    
  };