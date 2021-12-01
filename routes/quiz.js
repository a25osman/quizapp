const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /quiz/:quiz_id
  router.get("/:quiz_id", (req, res) => {
    db.query(`
      SELECT title, questions.id AS question_id, questions.content AS question,
        answers.id AS ans_id, answers.content AS option, answers.is_correct AS is_correct
      FROM quizzes
      JOIN questions ON quizzes.id = quiz_id
      JOIN answers ON questions.id = question_id
      WHERE quizzes.id = $1
      ORDER BY question_id ASC, ans_id ASC
      ;`,
      [req.params.quiz_id]
    )
      .then((data) => {
        console.log(data.rows)
        const quiz = data.rows[0];
        
        let templateVars = {quiz, userInfo: req.session.user}; 
        res.render("quiz_page", templateVars); // user is an object which contains user info
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
