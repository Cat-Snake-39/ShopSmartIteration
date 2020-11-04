const express = require("express");

const router = express.Router();
const shopControllers = require("../controllers/shopController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// This router handles our axios fetch requests to get prices and sends them back to the
// front end.

router.get("/auth/oauth", (req, res) => {
  const url =
    "https://github.com/login/oauth/authorize?" +
    "scope=user,repo&" +
    `redirect_uri=http://localhost:8080/api/auth/callback&` +
    `client_id=${process.env.CLIENT_ID}`;

  return res.redirect(url);
});

router.get(
  "/auth/callback",
  authController.token,
  userController.create,
  authController.login,
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/auth/verify", authController.verifyLogin, (req, res) => {
  res.status(200).json(res.locals);
});

router.use("/", shopControllers.getPrice, async (req, res) => {
  try {
    console.log("trying", res.locals.price);
    res.json(res.locals.price);
  } catch (err) {
    // check if we need to send as json?
    console.log("error", err);
    res.sendStatus(400);
  }
});

module.exports = router;
