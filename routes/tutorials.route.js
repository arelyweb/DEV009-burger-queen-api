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
  
    // // Retrieve all Tutorials
    // router.get("/", tutorials.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
    nextMain();
    
  };