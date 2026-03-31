const express = require("express");
const route = express.Router();
const crudController = require("../controllers/crud.controller");

route.get("/", (req, res) => {
  res.send("Hello, World!");
});

route.post("/add", crudController.createUser);
route.get("/get", crudController.getUser);

module.exports = route;
