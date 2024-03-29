const express = require("express");
const {
  register,
  login,
  fetchUser,
  getUsers,
} = require("../Controllers/userController");
const router = express.Router();


//POST method
router.post("/register", register);
router.post("/login", login);




//GET method
router.get("/fetchUser/:userId", fetchUser);
router.get("/", getUsers);

module.exports = router;
