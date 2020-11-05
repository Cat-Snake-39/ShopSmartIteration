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
    // insert into users table 
    const insertQuery = `INSERT INTO users (username, token) VALUES ('${login}', '${res.locals.user.token}');`
    db.query(insertQuery, (err, data) => {
      if (err) return next({ err, log: 'Error inserting user into database in userController.create' });
      console.log('user created!');
      return next();
    });
  })
    .catch(err => console.log(err));
};

module.exports = userController;
