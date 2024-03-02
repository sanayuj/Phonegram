const express=require("express")
const { register, login, fetchUser } = require("../Controllers/userController")
const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/fetchUser/:userId",fetchUser)



module.exports=router