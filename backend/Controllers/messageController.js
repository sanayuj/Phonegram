const messageModel=require("../Models/messageModel")

module.exports.createMessage=async(req,res,next)=>{
    const {chatId,text,sendderId}=req.body
    try {
        const message=new messageModel({
            chatId,text,sendderId
        })
const response=await message.save()
return res.json({response,status:true})

    } catch (error) {
        console.log(error);
    }
}

module.exports.getMessage=async(req,res)=>{
    const {chatId}=req.params
    try {
        const message=await messageModel.find({chatId})
        res.json({message,status:true})
    } catch (error) {
        console.log(error);
    }
}