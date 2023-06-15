module.exports = (app) => {
  const users = require("../controllers/user.controller");

  var router = require("express").Router();
  
  router.get("/", users.getUsers);
  // Create a new Tutorial
  router.post("/logIn", users.logIn);
  
  // Retrieve all Tutorials
  router.post("/rejester", users.rejester);
  
  
  app.use("/api/users", router);
};
