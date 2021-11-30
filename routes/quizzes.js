const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /quizzes/quiz/:quiz_id
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

  // GET /quizzes/new
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
  router.post("/", (req, res) => {
    db.query(`INSERT INTO quizzes (title) VALUES ($1);`, [req.body.title])
      .then((data) => {
        data.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });

    let numberOfQuestions = (Object.keys(req.body).length - 1) / 3;

    for (let i = 0; i < numberOfQuestions; i++) {
      let str_question = `question${i}`;
      let str_answer = `answer${i}`;
      let str_options = `options${i}`;
      let question_id;
      db.query(`INSERT INTO questions (content) VALUES ($1) RETURNING *;`, [
        req.body.str_question[0],
      ])
        .then((data) => {
          question_id = data.rows[0].id;
        })
        .catch((err) => {
          console.log(err.message);
        });
      for (let j in req.body.str_answer) {
        if (j === Number(req.body.str_options[0])) {
          db.query(
            `INSERT INTO answers (content, is_correct) VALUES ($1, TRUE);`,
            [req.body.str_answer[j]]
          )
            .then((data) => {
              console.log(data.rows[0]);
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          db.query(`INSERT INTO answers (content) VALUES ($1);`, [
            req.body.str_answer[j],
          ])
            .then((data) => {
              data.rows[0];
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      }
    }
  });

  return router;
};
