const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // GET /quizzes/quiz/:quiz_id
  router.get("/quiz/:quiz_id", (req, res) => {
    db.query(`
    SELECT privacy, title, questions.id, questions.content, answers.id, answers.content
    FROM quizzes
    JOIN questions ON quizzes.id = quiz_id
    JOIN answers ON questions.id = question_id
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
    res.render("quizzes_new")
  });

  router.post("/",(req, res) =>{
    let title = req.body.title;

    let q1 = req.body.q1

    let op1 = req.body.op1;
    let op2 = req.body.op2;
    let op3 = req.body.op3;
    let op4 = req.body.op4;

    let ans1 = req.body.bt1;
    let ans2 = req.body.bt2;
    let ans3 = req.body.bt3;
    let ans4 = req.body.bt4;

    db.query(`INSERT INTO quizzes (title) VALUES $1;`, [req.body.title])
    .then(data => {
      data.rows[0]
    }).catch((err)=>{
      console.log(err.message);
    })
  });

  return router;
};
