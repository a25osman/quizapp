// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// setting up the cookies
const cookieSession = require('cookie-session');
 
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const newquizRoutes = require("./routes/create_quiz");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const quizRoutes = require("./routes/quiz");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/", newquizRoutes(db));
app.use("/quiz", quizRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  if (req.session.userid){
    db.query(`SELECT * FROM quizzes WHERE privacy = FALSE;`)
      .then((data) => {
        const quizzes = data.rows;
        const templateVars = {
          quizzes: data.rows,
          userInfo: req.session.user
        }
        res.render("index", templateVars); // quizzes is an array containing quiz objects old to new
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    db.query(`SELECT * FROM quizzes WHERE privacy = FALSE;`)
      .then((data) => {
        const quizzes = data.rows;
        const templateVars = {
          quizzes: data.rows,
          userInfo: null
        }
        res.render("index", templateVars); // quizzes is an array containing quiz objects old to new
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
