import React, { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
function PotentalChats() {
  const { potentialChats } = useContext(ChatContext);
  console.log("Potential", potentialChats);
  return (
    <div>
      <div className="all-users">
        {potentialChats &&
          potentialChats?.user?.map((value, index) => {
            return(
            <div className="single-user" key={index}>
              {value.name}
              <span className="user-online"></span>
            </div>
            )
          })}
      </div>
    </div>
  );
}

export default PotentalChats;
