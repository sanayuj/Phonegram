import React, { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../Components/Chat/UserChat";
import { AuthContext } from "../Context/AuthContext";
import PotentalChats from "../Components/Chat/PotentalChats";


function Chat() {
  const { user } = useContext(AuthContext);

  const { userChats, isUserChatsLoading, userChatError } =
    useContext(ChatContext);
  console.log("UserChats", userChats);

  return (
    <div>
      <Container>
<PotentalChats/>
        {userChats?.length < 1 ? null : (
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="message-box flex-grow-0 pe-3" gap={3}>
              {isUserChatsLoading && <p>Loading..</p>}
              {userChats?.chats.map((chats, index) => (
                <div key={index}>
                  <UserChat chat={chats} user={user} />
                </div>
              ))}
            </Stack>

            <p>ChatBox</p>
          </Stack>
        )}
      </Container>
    </div>
  );
}

export default Chat;
