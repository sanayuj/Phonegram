import React from 'react'
import { useFetchRecipient } from '../../hooks/useFetchRecipient'

function UserChat({chat,user}) {
    const {recipientUser}=useFetchRecipient(chat,user)
    console.log(recipientUser,"888");
  return (
    <div>UserChat</div>
  )
}

export default UserChat