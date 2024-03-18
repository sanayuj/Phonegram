import { useState,useEffect } from "react";
import { baseUrl, getRequest } from "../utils/services";


export const useFetchRecipient=(chat,user)=>{
 const [recipientUser,setRecipientUser]=useState(null)
 const [error,setError]=useState(null)
 console.log(recipientUser,"---------------------------------->");

 const recipientId = chat?.members?.find((id) => id
!==user?.Id)


useEffect(()=>{
const getUser=async()=>{
    if(!recipientId) return 
    const response=await getRequest(`${baseUrl}/fetchUser/${recipientId}`)
    if(response.error){
       return setError(response)
    }
    console.log(response,"&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*");
    setRecipientUser(response)
    
}
getUser()
},[recipientId])
return {recipientUser,error}
}