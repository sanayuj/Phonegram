import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

function ChatBox() {
  const { user } = useContext(AuthContext);
  const { currentChat, message, isMessageLoading ,sendTextMessage} = useContext(ChatContext);
  const { recipientUser } = useFetchRecipient(currentChat, user);
  const [textmessage, setTextmessage] = useState("");


  if (!recipientUser) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation started yet!
      </p>
    );
  }
  if (isMessageLoading) {
    return <p style={{ textAlign: "center", width: "100%" }}>Loading....</p>;
  }
  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.user?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {message &&
          message?.message?.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
            >
              <span className="">{message?.text}</span>
              <span className="message-footer">
                {moment(message?.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textmessage}
          onChange={setTextmessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2"
        />
        <button className="send-btn" onClick={()=>sendTextMessage(textmessage,user,currentChat._id,setTextmessage)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
}

export default ChatBox;
