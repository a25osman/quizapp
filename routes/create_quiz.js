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
  router.post("/new", async (req, res) => {
    console.log(req.body)
    let numberOfQuestions = (Object.keys(req.body).length - 2) / 3;

    for (let i = 0; i < numberOfQuestions; i++) {
      let str_booleans = `answer_index${i}`;
      let index = req.body[str_booleans][0];
      req.body[str_booleans] = [];
      for (let j = 0; j < 4; j++) {
        if (j == index) {
          req.body[str_booleans].push(true)
        } else {
          req.body[str_booleans].push(false)          
        }
      }
    }
    console.log(`req.body new------`, req.body)

    let userid = req.session.userid;
    let quizID;
    let privacy = req.body.privateorpublic;
    if (privacy === "Private") {
      privacy = true;
    } else {
      privacy = false;
    }


    // start of query
    let data
    try {
      data = await db.query(
        `INSERT INTO quizzes (user_id, title, privacy) VALUES ($1, $2, $3) RETURNING *;`,
        [userid, req.body.title, privacy]
      )
    } catch(err) {
      console.log(err)
    }
    
      
      quizID = data.rows[0].id;
      for (let i = 0; i < numberOfQuestions; i++) {
        let str_question = `question${i}`;
        let str_choices = `choices${i}`;
        let str_booleans = `answer_index${i}`;
        let questionID;
        try {
          const info = await db.query(
            `INSERT INTO questions (quiz_id, content) VALUES ($1, $2) RETURNING *;`,
            [quizID, req.body[str_question][0]]
            )
          questionID = info.rows[0].id;
        } catch (err) {
          console.log(err)
        }

        for (let j in req.body[str_choices]) {
          try {
            await db.query(
              `INSERT INTO answers (question_id, content, is_correct) VALUES ($1, $2, $3) RETURNING *
              ;`, [questionID, req.body[str_choices][j], req.body[str_booleans][j]])
          } catch (err) {
            console.log(err)
          }
        }
          
      }    

    res.redirect("/");
  });

  return router;
};
