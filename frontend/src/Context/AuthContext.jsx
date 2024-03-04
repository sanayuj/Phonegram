import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError,setRegisterError]=useState(null)
    const [isRegisterLoading,setIsRegisterLoading]=useState(false)
    const [registerInfo,setRegisterInfo]=useState({
        name:"",
        email:"",
        password:""
    })
console.log(registerInfo);
    const updateRegisterInfo=useCallback((info)=>{
        setRegisterInfo(info)
    },[])
    return <AuthContext.Provider value={{ user,registerInfo,updateRegisterInfo }}>{children}</AuthContext.Provider>;
};
