QuizApp Project
=========

## Description

QuizApp is a multi-page multiple-choice quiz creation app, built using Express, jQuery, HTML5 and CSS. Users can create as many quizzes as they like and publicly list them on the homepage for any user to complete. Not too confident about sharing your quiz to everyone? Don't worry, just go to your user profile page, and change the privacy settings. You can even set the privacy setting when you're creating your quiz! Users can share the results of their quiz to anyone, even non-registered guests.


## Final Product

!["Screenshot of quizapp homepage"](https://github.com/isaiahmutekanga/quizapp/blob/master/docs/quizapp_homepage.png?raw=true)

!["screenshot of user profile page"](https://github.com/isaiahmutekanga/quizapp/blob/master/docs/quizapp_profilepage.png?raw=true)

!["screenshot of quiz results page"](https://github.com/isaiahmutekanga/quizapp/blob/master/docs/quizapp_results.png?raw=true)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information, e.g.
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Create a database called midterm!
4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Tips

- Run the quiz_schema.sql file in psql to create the tables i.e run `\i midterm/db/schema/quiz_schema.sql` (Relative route)
- Run the 01_users.sql file in psql to populate the users table with test users i.e run `\i midterm/db/seeds/01_users.sql` (Relative route)
- You can use the password: `password` to log in to any user account on quizApp for testing purposes

## Dependencies

- bcryptjs ^2.4.3
- chalk ^2.4.2
- cookie-session ^1.4.0
- dotenv ^2.0.0
- ejs ^2.6.2
- express ^4.17.1
- morgan ^1.9.1
- pg ^8.5.0
- pg-native ^3.0.0
- sass ^1.35.
