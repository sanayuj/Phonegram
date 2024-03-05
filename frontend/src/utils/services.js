export const baseUrl="http://localhost:4000/"

export const postRequest=async(url,body)=>{
   const response= await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body
    })
    const data=await response.data()

    if(!response.ok){
        let message;
        if(data?.message){
            message=data.message
        }else{
            message=data
        }
        return {error:true,message }
    }
    return data
}