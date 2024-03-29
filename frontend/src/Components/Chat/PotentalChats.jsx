import React, { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
import {AuthContext} from "../../Context/AuthContext"
function PotentalChats() {
  const {user}=useContext(AuthContext)
  const { potentialChats,createChat ,onlineUsers} = useContext(ChatContext);
  return (
    <div>
      <div className="all-users">
        {potentialChats &&
          potentialChats?.map((value, index) => {
            return(
            <div className="single-user" key={index} onClick={()=>createChat(user?.Id,value?._id)}>
              {value.name}
              <span className={onlineUsers.some((user) => user?.userId === value?._id) ? "user-online" : ""}></span>

            </div>
            )
          })}
      </div>
    </div>
  );
}

export default PotentalChats;
