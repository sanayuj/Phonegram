const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./Config/dbConfig");
const userRouter = require("./Routes/userRoutes");
const chatRouter=require("./Routes/chatRoutes")
const messageRouter=require("./Routes/messageRoute")

//Dot ENV Config

require("dotenv").config();

// Database Config

dbConnection.dbConnection();

//JSON format Config

app.use(express.json());

//Cross origin resource sharing Config

app.use(cors());

//Route Config

app.use("/", userRouter);
app.use("/chats",chatRouter)
app.use("/msg",messageRouter)

//Server Config

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
