const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /quiz/:quiz_id
  router.get("/:quiz_id", (req, res) => {
    db.query(`
      SELECT title, quizzes.id as quiz_id, questions.id AS question_id, questions.content AS question,
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
        // console.log(data.rows)
        console.log("refresh succesful")
        const array = data.rows;
        let numRuns = 0;
        let numQuestions = array.length/4;
        let quiz = [];
        while (numRuns < numQuestions) {
          let quizQuestion = {
            title: null,
            quiz_id: null,
            question_id: null,
            question: null,
            ans_id: [],
            option: [],
            is_correct: []
          };
          for (let i = 0 + 4*numRuns; i < 4 + 4*numRuns; i++) {
            quizQuestion.title = array[i].title;
            quizQuestion.quiz_id = array[i].quiz_id;
            quizQuestion.question_id = array[i].question_id;
            quizQuestion.question = array[i].question;
            quizQuestion.ans_id.push(array[i].ans_id);
            quizQuestion.option.push(array[i].option);
            quizQuestion.is_correct.push(array[i].is_correct);
          }
          quiz.push(quizQuestion)
          numRuns ++;
        }
        let templateVars = {quiz: quiz, userInfo: req.session.user};
        console.log("---TEMPLATE VARS RETURNS QUIZ-\n\n\n", quiz)
        res.render("quiz_page", templateVars); // user is an object which contains user info
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
