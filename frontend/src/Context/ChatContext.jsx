import { useEffect, useState ,createContext, useContext, useCallback} from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [potentialChats,setPotentialChats]=useState([])
useEffect(()=>{
  const getUsers=async()=>{
    const response=await getRequest(`${baseUrl}/`)
    if(response.error){
      return console.log("Error fetching users",response);
    }
    setPotentialChats(response)

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
        setUserChats(response);
  
        const pChats = response?.chats.filter((U) => {
          let isChatCreated = false;
          if (user?.Id === U?._id) return false;
          if (userChats) {
            isChatCreated = userChats?.some((chat) => {
              return chat?.members[0] === U?._id || chat?.members[1] === U?._id;
            });
          }
          return !isChatCreated;
        });
        setPotentialChats(pChats);
      }
    };
  
    getUserChat();

  }, [user]);
  const createChat=useCallback(async(firstId,secondId)=>{
    const response= await postRequest(`${baseUrl}/chats`,);
  },[])

  return (
    <ChatContext.Provider
       value={{ userChats, isUserChatLoading, userChatError,potentialChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};
