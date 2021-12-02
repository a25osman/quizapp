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
        const array = data.rows;
        let numRuns = 0;
        let numQuestions = array.length/4;
        let quiz = [];
        while (numRuns < numQuestions) {
          let quizQuestion = {
            index: null,
            title: null,
            quiz_id: null,
            question_id: null,
            question: null,
            ans_id: [],
            option: [],
            is_correct: []
          };
          for (let i = 0 + 4*numRuns; i < 4 + 4*numRuns; i++) {
            quizQuestion.index = numRuns;
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
        res.render("quiz_page", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:quiz_id", (req, res) => {
    let numQuestions = req.body.answers_index.length;
    let correct = 0;
    for (let anskey of req.body.answers_index){
      db.query(`SELECT id FROM answers;`)
        .then((data) => {
          // console.log(data.rows)
          // console.log(anskey)
          for (let i in data.rows) {
            if(data.rows[i].id == anskey) {
              correct ++;
            }
          }
        })
        .catch((err) => console.log(err.message));
    }
    let quizid = req.params.quiz_id;
    let userid = req.session.userid;
    db.query(`
      INSERT INTO attempts (user_id, quiz_id, correct, total) 
      VALUES ($1, $2, $3, $4)
      ;`, [userid, quizid, correct, numQuestions]
    )
      // .then((data) => res.redirect(''))
      .catch((err) => console.log(err.message));
    console.log(`you had ${correct} correct answers out of ${numQuestions} Questions`)
  })

  return router;
};
