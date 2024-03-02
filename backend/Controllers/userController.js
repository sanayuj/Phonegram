const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const maxAge = "3d";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SCERET_KEY, { expireIn: maxAge });
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
    await newUser.save();
    return res.json({status:true,message:"User registered successfully"})
  } catch (err) {
    console.log(err);
  }
};


module.exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body
        const userExist=await userSchema.findOne({email})
        

    }catch(err){
        console.log(err);
    }
}
