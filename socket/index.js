const { Server } = require("socket.io");

const io = new Server({ cors:"http://localhost:5173" });
let onlineUser=[]
io.on("connection", (socket) => {
    console.log(socket.id,"ID");



    socket.on("addNewUser",(userId)=>{
        !onlineUser.some((user)=>{user.userId===userId})&&
onlineUser.push({
    userId,
    socketId:socket.id
})
console.log(onlineUser,"Online User!!!");
io.emit("getOnlineUsers",onlineUser)
    })
});


io.listen(3000);