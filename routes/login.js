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
    WHERE users.email = $1;
    `, [email])
    .then((data) => {
      if (bcrypt.compareSync(password, data.rows[0].password)) {
        userid = data.rows[0].id
        req.session.userid = userid;
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.send('Incorrect Username and/or Password!')
    });  
  })

  return router;
};
