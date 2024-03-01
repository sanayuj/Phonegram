require("dotenv").config()
const mongoose=require("mongoose")


module.exports={
    dbConnection: async ()=>{
try{
await mongoose.connect(process.env.DB_URl).then(()=>{
    console.log("Database connected successfully");
})
}catch(error){
    console.log(error);
}
    }
}