const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /login
  router.get("/", (req, res) => {
    const templateVars = { user: null };
    res.render("login", templateVars);
  });

  // GET /registration
  router.get("/", (req, res) => {
    const templateVars = { user: null };
    res.render("register", templateVars);
  });

  return router;
};
