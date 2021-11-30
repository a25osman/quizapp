const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /quiz/:quiz_id
  router.get("/quiz/:quiz_id", (req, res) => {
    db.query(
      `
    SELECT privacy, title, questions.id, questions.content, answers.id, answers.content
    FROM quizzes
    JOIN questions ON quizzes.id = quiz_id
    JOIN answers ON questions.id = question_id
    WHERE quizzes.id = $1
    ;`,
      [req.params.quiz_id]
    )
      .then((data) => {
        const quiz = data.rows[0];
        let templateVars = { quiz };
        res.render("quiz_show", templateVars); // quiz is an object containing quiz questions and answers
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET /new
  router.get("/new", (req, res) => {
    // if (req.session.userid){
    //   db.query(`SELECT * FROM users WHERE id = $1;`, [req.session.userid])
    //   .then(data => {
    //     const user = data.rows[0];
    //     let templateVars = {user};
    //     res.render("quizzes_new", templateVars); // user is an object which contains user info
    //   })
    //   .catch(err => console.log(err));
    // } else {
    //   res.redirect("/login")
    // }
    res.render("quizzes_new");
  });

  // POST /quizzes/
  router.post("/new", (req, res) => {
    // let userId = req.session.userId;
    let numberOfQuestions = (Object.keys(req.body).length - 1) / 3;
    let userID = 1;
    let quizID;
    db.query(`INSERT INTO quizzes (user_id, title) VALUES ($1, $2) RETURNING *;`, [userID, req.body.title])
      .then((data) => {
        quizID = data.rows[0].id;
        for (let i = 0; i < numberOfQuestions; i++) {
          let str_question = `question${i}`;
          let str_answer = `answer${i}`;
          let str_options = `options${i}`;
          let questionID;
          db.query(`INSERT INTO questions (quiz_id, content) VALUES ($1, $2) RETURNING *;`, [quizID, req.body[str_question][0]])
            .then((data) => {
              questionID = data.rows[0].id;
              for (let j in req.body[str_answer]) {
                if (j === Number(req.body[str_options][0])) {
                  db.query(
                    `INSERT INTO answers (question_id, content, is_correct) VALUES ($1, $2, true) RETURNING *;`,
                    [questionID, req.body[str_answer][j]]
                  )
                    .then(res.redirect('/'))
                    .catch((err) => console.log(err.message));
                } else {
                  db.query(
                    `INSERT INTO answers (question_id, content) VALUES ($1, $2) RETURNING *;`,
                    [questionID, req.body[str_answer][j]]
                  )
                    .then(res.redirect('/'))
                    .catch((err) => console.log(err.message));
                }
              }
            })
            .catch((err) => console.log(err.message));
        }
      })
      .catch((err) => console.log(err.message));
  });

  return router;
};
