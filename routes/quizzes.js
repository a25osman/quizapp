const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // GET /quizzes/:quiz_id
  router.get("/:quiz_id", (req, res) => {
    db.query(`
    SELECT privacy, title, questions.id, questions.content, answer_options.id, answer_options.content
    FROM quizzes
    JOIN questions ON quizzes.id = quiz_id
    JOIN answer_options ON questions.id = question_id
    WHERE quizzes.id = $1
    ;`, [req.params.quiz_id])
    .then(data => {
      const quiz = data.rows[0];
      let templateVars = {quiz};
      res.render("quiz_show", templateVars); // quiz is an object containing quiz questions and answers
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // GET /quizzes/new
  router.get("/new", (req, res) => {
    if (req.session.userid){
      db.query(`SELECT * FROM users WHERE id = $1;`, [req.session.userid])
      .then(data => {
        const user = data.rows[0];
        let templateVars = {user};
        res.render("quizzes_new", templateVars); // user is an object which contains user info
      })
    } else {
      res.redirect("/login")
    }
  });
  
  return router;
};
