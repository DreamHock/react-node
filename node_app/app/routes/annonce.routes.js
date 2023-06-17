module.exports = (app) => {
  const annonces = require("../controllers/annonce.controller");

  var router = require("express").Router();

  // Create a new annonce
  router.post("/", annonces.create);

  // Retrieve all annonces
  router.get("/", annonces.findAll);

  // Retrieve all published annonces
  // router.get("/published", annonces.findAllPublished);

  // Retrieve a single annonce with id
  router.get("/:id", annonces.findOne);

  // Update a annonce with id
  router.put("/:id", annonces.update);

  // Delete a annonce with id
  router.delete("/:id", annonces.delete);

  // Create a new annonce
  router.delete("/", annonces.deleteAll);

  app.use("/api/annonces", router);
};
