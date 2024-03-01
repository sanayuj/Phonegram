const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = require("../Models/userModel");
const { json } = require("express");

module.exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await userSchema.findOne({ email });

  if (userExist) {
    return res.json({ status: false, message: "Account already exists" });
  }
  if (!name || !email || !password) {
    return res.json({ status: false, message: "All fields required" });
  }
  if (!validator.isEmail(email)) {
    return res.json({ status: false, message: "Check Valid email" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.json({ status: false, message: "Password must be strong" });
  }

  const newUser = new userSchema({
    name,
    email,
    password,
  });

  const salt=await bcrypt.genSalt(10)
  newUser.password=await bcrypt.hash(user.password,salt)
  await newUser.save()
};
