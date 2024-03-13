import { useEffect, useState ,createContext, useContext} from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [potentialChats,setPotentialChats]=useState([])

  const getUsers=async()=>{
    const response=await getRequest(`${baseUrl}/`)
    if(response.error){
      return console.log("Error fetching users",response);
    }
    setPotentialChats(response)

  }

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
        const pChats=response.filter((U)=>{
          let isChatCreated=false
          if(user.Id===U.Id)return false
          if(userChats){
           isChatCreated = userChats.some((chat)=>{
              return chat.members[0]===U.Id || chat.members[1]===U.Id
            })
          }
          !isChatCreated
        })
       
      }
    };
    getUserChat()
    getUsers()
  }, [userChats]);

  return (
    <ChatContext.Provider
       value={{ userChats, isUserChatLoading, userChatError,potentialChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};
