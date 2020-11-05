const axios = require("axios");
const jwt = require('jsonwebtoken');

const authController = {};

authController.token = async (req, res, next) => {
  axios
    .post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    )
    .then((githubRes) => {
      res.locals.user = { token: githubRes.data.access_token };
      // console.log(res.locals.user)
      return next();
    })
    .catch((err) =>
      next({
        log: `Error in middleware authController.token: ${err}`,
      })
    );
};

authController.login = async (req, res, next) => {
  try {
    const payload = { id: res.locals.user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("jwt_token", token, { httpOnly: true });
    return next();
  } catch (err) {
    return next({
      log: `Error in middleware authController.login: ${err}`,
    });
  }
};

authController.verifyLogin = async (req, res, next) => {
  try {
    jwt.verify(req.cookies.jwt_token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(200).json({ isLoggedIn: false });
      res.locals = { isLoggedIn: true };
      console.log(res.locals.isLoggedIn);
      return next();
    });
  } catch (err) {
    return next({
      log: `Error in middleware authController.verifyLogin: ${err}`,
    });
  }
  return null;
};

module.exports = authController;
