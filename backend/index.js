const express=require("express")
const app=express()
const cors=require("cors")
const dbConnection=require("./Config/dbConfig")
const userRouter=require("./Routes/userRoutes")
require("dotenv").config()


dbConnection.dbConnection()

app.use(express.json())
app.use(cors())


app.use("/",userRouter)



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})