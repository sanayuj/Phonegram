const chatModel =require("../Models/chatModel")

module.exports.createchat=async(req,res)=>{
    const {firstId,secondId}=req.body
    try {
        const chat=await chatModel.findOne({members:{$all:[firstId,secondId]}})

        if(chat){
            return res.json({chat,status:true})
        }
       const newChat=new chatModel({member:[firstId,secondId]})
       const response=await newChat.save()
       res.json({response,status:true})
    } catch (error) {
        console.log(error);
    }
}

module.exports.findUserChats=async(req,res)=>{
    try {
       const userId=req.params.userId
       const chats=await chatModel.find({members:{$in:[userId]}})
       res.json({chats,status:true})
    } catch (error) {
        console.log(error);
    }
}

module.exports.findChat=async(req,res)=>{
    try {
       const {firstId,secondId}=req.params
       const chat=await chatModel.findOne({members:{$all:[firstId,secondId]}})
       res.json({chat,status:true})
    } catch (error) {
        console.log(error);
    }
}