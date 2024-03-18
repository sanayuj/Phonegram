import { useEffect, useState ,createContext, useContext, useCallback} from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [potentialChats,setPotentialChats]=useState([])
  const [currentChat,setCurrentChat]=useState(null)
  const [isMessageLoading,setMessageLoading]=useState(false)
  const [messageError,setMessageError]=useState(null)
  console.log(userChats,"****");
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



  const updateCurrentChat=useCallback((chat)=>{setCurrentChat(chat)},[])

  const createChat=useCallback(async(firstId,secondId)=>{
    const response= await postRequest(`${baseUrl}/chats`,JSON.stringify({
      firstId,secondId
    }));
    if(response.error){
      return console.log("Error creating chat",response);
    }
    console.log(response,"&&&&&&*8888888&&&&&&&");
    setUserChats((prev)=>[...prev,response])
  },[])

  return (
    <ChatContext.Provider
       value={{ userChats, isUserChatLoading, userChatError,potentialChats,createChat,updateCurrentChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};
