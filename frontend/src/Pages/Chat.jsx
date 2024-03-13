import React, { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';

function Chat() {
  const { userChats, isUserChatsLoading, userChatError } = useContext(ChatContext);
  console.log("UserChats", userChats);

  return (
    <div>Chat</div>
  );
}

export default Chat;
