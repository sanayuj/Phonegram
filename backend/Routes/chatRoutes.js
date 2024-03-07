const express=require("express")
const { createchat, findUserChats, findChat } = require("../Controllers/chatController")
const router=express.Router()


router.post("/",createchat)
router.get("/:userId",findUserChats)
router.get("/find/:firstId/:secondId",findChat)


module.exports = router;
