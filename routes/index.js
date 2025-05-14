const routes = require("express").Router();
// const lesson1Controller = require("../controllers/lesson1");

// routes.get("/", lesson1Controller.emilyRoute);
// routes.get("/hannah", lesson1Controller.hannahRoute);
const contacts = require('./contacts');

routes.use('/contacts', contacts);

module.exports = routes;
