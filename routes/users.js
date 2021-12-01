/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /users/:user_id
  router.get("/creator/:user_id", (req, res) => {
    const userid = req.session.userid;
    if (!userid){
      return res.redirect("/");
    }

    db.query(`SELECT * FROM quizzes WHERE user_id = $1;`, [userid])
    .then(data => {
      console.log("-------",data.rows)
      console.log("------",req.session.username)
      let templateVars = {quizzes: data.rows, userInfo: req.session.user};
      res.render("profile_user", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });

  router.get("/:user_id", (req, res) => {

  });

  // GET /users/:user_id/:quiz_id  --> Quiz Result Page
  router.get("/:user_id/:quiz_id", (req, res) => {

  });


  return router;
};
