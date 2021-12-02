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
      let templateVars = {quizzes: data.rows, userInfo: req.session.user};
      res.render("profile_user", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });


  // GET /users/:user_id/:quiz_id  --> Quiz Result Page
  router.get("/:user_id/:quiz_id", (req, res) => {
  
    db.query(`
      SELECT *, quizzes.title AS title
      FROM attempts 
      JOIN quizzes ON quiz_id = quizzes.id
      WHERE attempts.user_id = $1 AND quiz_id = $2
      ;`, [req.params.user_id, req.params.quiz_id])
    .then(data => {
      if (req.session.user) {
        let templateVars = {
          correct: data.rows.reverse()[0].correct,
          total: data.rows.reverse()[0].total,
          title: data.rows.reverse()[0].title,
          userInfo: req.session.user
        };
        // console.log(templateVars.correct, templateVars.total);
        res.render("profile_user_result", templateVars);
      } else {
        let templateVars = {
          correct: data.rows.reverse()[0].correct,
          total: data.rows.reverse()[0].total,
          title: data.rows.reverse()[0].title,
          userInfo: null
        };
        // console.log(templateVars.correct, templateVars.total);
        res.render("profile_user_result", templateVars);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });


  return router;
};
