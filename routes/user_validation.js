const express = require("express");
const router = express.Router();

// Importing password hashing
const bcrypt = require('bcryptjs');


module.exports = (db) => {
  // POST /login/
  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 12);
    let userid;
    db.query(`
    SELECT * FROM users
    WHERE users.email = $1 AND users.password = $2;
    `, [email, hashedPassword])
    .then((data) => {
      userid = data.rows[0].id
      req.session.userid = userid;
    })
    .catch((err) => {
      res.send('Incorrect Username and/or Password!')
    });  
  })

  router.post("/logout",(req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
