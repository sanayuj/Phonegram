import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { ChatContext } from '../../Context/ChatContext'
import { useFetchRecipient } from '../../hooks/useFetchRecipient'
import { Stack } from 'react-bootstrap'
import moment  from 'moment'

function ChatBox() {
    const {user}=useContext(AuthContext)
    const {currentChat,message,isMessageLoading}=useContext(ChatContext)

    const {recipientUser}=useFetchRecipient(currentChat,user)
    console.log(recipientUser,"@@@@@2@@@@@@@@@@@@@@@@@@");
    console.log(message,"*******^&&&^&^");
    if(!recipientUser){
        <p style={{textAlign:'center',width:"100%"}}>
            No conversation started yet!
        </p>
    }
    if(isMessageLoading){
        <p style={{textAlign:'center',width:"100%"}}>
            Loading
        </p>
    }
  return (
    <Stack gap={4} className='chat-box'>
        <div className="chat-header">
            <strong>{recipientUser?.user?.name}</strong>
        </div>
        <Stack gap={3} className='messages'>
            {message && message?.message?.map((message,index)=>(
                <Stack key={index} className={`${message?.senderId===user?._id ?"message self align-self-end flex-grow-0":"message align-self-start flex-grow-0"}`}>
                    <span className=''>{message.text}</span>
                    <span className='message-footer'>{moment(message.createdAt).calendar()}</span>
                </Stack>
            ))}
        </Stack>
    </Stack>
  )
}

export default ChatBox