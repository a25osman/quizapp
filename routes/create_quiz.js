const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /new
  router.get("/new", (req, res) => {
    if (req.session.userid){
      db.query(`SELECT * FROM users WHERE id = $1;`, [req.session.userid])
      .then(data => {
        let templateVars = {userInfo: data.rows[0]};
        res.render("quizzes_new", templateVars); // user is an object which contains user info
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    } else {
      
      res.redirect("/")
    }
  });

  // POST /quizzes/
  router.post("/new", (req, res) => {
    console.log(req.body)
    let userid = req.session.userid;
    let numberOfQuestions = (Object.keys(req.body).length - 2) / 3;
    let quizID;
    let privacy = req.body.privateorpublic;
    if (privacy === "Private") {
      privacy = true;
    } else {
      privacy = false;
    }
    db.query(
      `INSERT INTO quizzes (user_id, title, privacy) VALUES ($1, $2, $3) RETURNING *;`,
      [userid, req.body.title, privacy]
    )
      .then((data) => {
        quizID = data.rows[0].id;
        for (let i = 0; i < numberOfQuestions; i++) {
          let str_question = `question${i}`;
          let str_answer = `choices${i}`;
          let str_options = `answer_index${i}`;
          let questionID;
          db.query(
            `INSERT INTO questions (quiz_id, content) VALUES ($1, $2) RETURNING *;`,
            [quizID, req.body[str_question][0]]
          )
            .then((data) => {
              questionID = data.rows[0].id;
              for (let j in req.body[str_answer]) {
                if (j === req.body[str_options][0]) {
                  db.query(
                    `INSERT INTO answers (question_id, content, is_correct) VALUES ($1, $2, true) RETURNING *;`,
                    [questionID, req.body[str_answer][j]]
                  )
                    .then()
                    .catch((err) => console.log(err.message));
                } else {
                  db.query(
                    `INSERT INTO answers (question_id, content) VALUES ($1, $2) RETURNING *;`,
                    [questionID, req.body[str_answer][j]]
                  )
                    .then()
                    .catch((err) => console.log(err.message));
                }
              }
            })
            .catch((err) => console.log(err.message));
        }
      })
      .catch((err) => console.log(err.message));
    res.redirect("/");
  });

  return router;
};
