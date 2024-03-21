import React, { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../Components/Chat/UserChat";
import { AuthContext } from "../Context/AuthContext";
import PotentalChats from "../Components/Chat/PotentalChats";
import ChatBox from "../Components/Chat/ChatBox";

function Chat() {
  const { user } = useContext(AuthContext);

  const { userChats, isUserChatsLoading, userChatError,updateCurrentChat,onlineUsers } =
    useContext(ChatContext);

  return (
    <div>
      <Container>
        <PotentalChats />
        {userChats?.length < 1 ? null : (
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="message-box flex-grow-0 pe-3" gap={3}>
              {isUserChatsLoading && <p>Loading..</p>}
              {userChats?.map((chats, index) => (
                <div key={index} onClick={()=>updateCurrentChat(chats)}>
                  <UserChat chat={chats} user={user} />
                </div>
              ))}
            </Stack>

<ChatBox/>
          </Stack>
        )}
      </Container>
    </div>
  );
}

export default Chat;
