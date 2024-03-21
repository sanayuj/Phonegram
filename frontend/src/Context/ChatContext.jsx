import { useEffect, useState ,createContext, useContext, useCallback} from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import {io} from "socket.io-client"

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [potentialChats,setPotentialChats]=useState([])
  const [currentChat,setCurrentChat]=useState(null)
  const [message,setMessage]=useState(null)
  const [isMessageLoading,setMessageLoading]=useState(false)
  const [messageError,setMessageError]=useState(null)
  const [sendTextMessageError,setSendTextMessageError]=useState(null)
  const [newMessage,setNewMessage]=useState(null)
  const [socket,setSocket]=useState(null)
  const [onlineUsers,setOnlineUsers]=useState([])


  console.log(onlineUsers,"***^^^^^^^^^*** Online Users");

  useEffect(()=>{
const newSocket=io("http://localhost:3000")
setSocket(newSocket)
return ()=>{
  newSocket.disconnect()
}
  },[user])

useEffect(()=>{
if(socket===null)return
  socket.emit("addNewUser",user?.Id)
  socket.on("getOnlineUsers",(response)=>{
    console.log(response,"REs");
setOnlineUsers(response)
  })
},[socket])

useEffect(()=>{
  const getUsers=async()=>{
    const response=await getRequest(`${baseUrl}/`)
    if(response.error){
      return console.log("Error fetching users",response);
    }

    const pChats = response?.user?.filter((U) => {
      let isChatCreated = false;
      if (user?.Id === U?._id) return false;
      if (userChats) {
        isChatCreated = userChats?.some((chat) => {
          return chat?.members[0] === U?._id || chat?.members[1] === U?._id;
        });
      }
      return !isChatCreated;
    });
    setPotentialChats(pChats)

  }
  getUsers()

},[userChats])
  

  useEffect(() => {
    const getUserChat = async () => {
      if (user?.Id) {
        setIsUserChatLoading(true);
        setUserChatError(null);
        const response = await getRequest(`${baseUrl}/chats/${user?.Id}`);
        setIsUserChatLoading(false);
        if (response.error) {
          return setUserChatError(response);
        }
        setUserChats(response?.chats);
      }
    };
  
    getUserChat();

  }, [user]);



  useEffect(() => {
    const getMessage = async () => {
      if (user?.Id) {
        setMessageLoading(true);
        setMessageError(null);
        const response = await getRequest(`${baseUrl}/msg/fetchMsg/${currentChat?._id}`);
        setMessageLoading(false);
        if (response.error) {
          return setMessageError(response);
        }
        setMessage(response);
      }
    };
  
    getMessage();

  }, [currentChat]);

  const sendTextMessage=useCallback(async(textMessage,sender,currentChatId,setTextMessage)=>{
if(!textMessage){
  return console.log("you must type something")
}
const response =await postRequest(`${baseUrl}/msg/`,JSON.stringify({
  chatId:currentChatId,
  senderId:sender?._Id,
  text:textMessage 
}))

if (response?.error) {
  return setSendTextMessageError(response);
}
setNewMessage(response)

setMessage((prev)=>{
  let prevValue=prev?.message
  return[...prevValue,response]})
setTextMessage("")

  },[])

  const updateCurrentChat=useCallback((chat)=>{setCurrentChat(chat)},[])

  const createChat=useCallback(async(firstId,secondId)=>{
    const response= await postRequest(`${baseUrl}/chats`,JSON.stringify({
      firstId,secondId
    })); 
    if(response.error){
      return console.log("Error creating chat",response);
    }
    setUserChats((prev)=>[...prev,response])
  },[userChats])

  return (
    <ChatContext.Provider
       value={{ userChats, isUserChatLoading, userChatError,potentialChats,createChat,updateCurrentChat,message,isMessageLoading,messageError,currentChat,sendTextMessage}}
    >
      {children}
    </ChatContext.Provider>
  );
};
