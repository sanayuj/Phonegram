import React from "react";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import profile from "../../assets/profile.svg"

function UserChat({ chat, user }) {
  const { recipientUser } = useFetchRecipient(chat, user);
  console.log(recipientUser, "888");
  
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between" role="button"
    >
      <div className="d-flex">
        <div className="me-2">
            <img src={profile} height="30px"/>
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.user?.name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/2/3232</div>
        <div className="this-user-notifications">2</div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
}

export default UserChat;
