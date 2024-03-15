import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatContext'
function PotentalChats() {
    const {potentialChats}=useContext(ChatContext)
    console.log("Potential",potentialChats)
  return (
   
    <div>PotentalChats</div>
  )
}

export default PotentalChats