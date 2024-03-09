const express = require("express");
const {
  handleSignIn,
  handleSignUp,
  handleSignUpNewUser,
  handleSignInToAcc,
  handleUserLogOut,
} = require("../controllers/user");

const router = express.Router();

router.get("/signin", handleSignIn);
router.get("/signup", handleSignUp);

router.post("/signin", handleSignInToAcc);
router.post("/signup", handleSignUpNewUser);

router.get("/logout", handleUserLogOut);

module.exports = router;
