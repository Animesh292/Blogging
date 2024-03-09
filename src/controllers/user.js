const User = require("../models/user");

async function handleSignIn(req, res) {
  return res.render("Signin");
}
async function handleSignUp(req, res) {
  return res.render("SignUp");
}

async function handleSignInToAcc(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Invalid email or password.",
    });
  }
}

async function handleSignUpNewUser(req, res) {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogOut(req, res) {
  res.clearCookie("token").redirect("/");
}

module.exports = {
  handleSignIn,
  handleSignUp,
  handleSignUpNewUser,
  handleSignInToAcc,
  handleUserLogOut,
};