const axios = require("axios");
const db = require("../modules/shopModel");

const userController = {};

userController.create = async (req, res, next) => {

  // ADD USER TO USER TABLE
  axios.get('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${res.locals.user.token}`,
    },
  }).then(({ data: { login } }) => {
    // first check if user exists in database
    const userQuery = `SELECT username FROM users WHERE username = '${login}';`;
    db.query(userQuery, (err, userQueryData) => {
      // if an error occurs, invoke global error handler
      if (err) next({ err, log: 'Error querying for existing user in userController.create' });
      // if rowCount is equal to 0, meaning user doesn't exist
      if (userQueryData.rowCount === 0) {
        // insert into users table 
        const insertQuery = `INSERT INTO users (username, token) VALUES ('${login}', '${res.locals.user.token}');`
        db.query(insertQuery, (err, data) => {
          // if there's an error trying to insert, invoke global error handler
          if (err) return next({ err, log: 'Error inserting user into database in userController.create' });
          console.log('user created!');
          // move onto next middleware
          return next();
        });
      }
      // else move onto next middleware
      return next();
    })
  })
    .catch(err => console.log(err));
};

module.exports = userController;
