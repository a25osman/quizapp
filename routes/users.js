/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /profile/:user_id
  router.get("/:user_id", (req, res) => {

  });

  // GET /profile/:user_id/:quiz_id/result
  router.get("/:user_id/:quiz_id/result", (req, res) => {

  });


  return router;
};
