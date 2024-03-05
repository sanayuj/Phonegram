const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SCERET_KEY, { expiresIn: maxAge });
};

module.exports.register = async (req, res, next) => {
  try {
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

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    let user = await newUser.save();
    let token = createToken(user._id);
    let id = user._id;
    return res.json({
      name,
      email,
      token,
      id,
      status: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ status: false, message: "All fields required" });
    }
    const userExist = await userSchema.findOne({ email });

    if (userExist) {
      const matchPassword = await bcrypt.compare(password, userExist.password);
      if (matchPassword) {
        let token = createToken(userExist._id);
        let Id = userExist._id;
        let name = userExist.name;
        return res.json({
          status: true,
          token,
          Id,
          email,
          name,
          message: "Login success",
        });
      } else {
        return res.json({ status: false, message: "Incorrect password" });
      }
    } else {
      return res.json({ status: false, message: "Account not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.fetchUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await userSchema.findById(userId);
    if (user) {
      return res.json({ status: true, user });
    } else {
      return res.json({ status: false });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const user = await userSchema.find({});
    if (user) {
      return res.json({ status: true, user });
    } else {
      return res.json({ status: false });
    }
  } catch (error) {
    console.log(error);
  }
};
