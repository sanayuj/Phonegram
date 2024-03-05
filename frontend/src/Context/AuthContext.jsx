import { createContext, useCallback, useState } from "react";
import { postRequest } from "../utils/services";
import { baseUrl } from "../utils/services";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(registerInfo);
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault()
    setIsRegisterLoading(true);
    setRegisterError(null);
    const response = await postRequest(
      `${baseUrl}/register`,
      JSON.stringify(registerInfo)
    );
    setIsRegisterLoading(false);
    if (response.error) {
      return setRegisterError(response);
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);
  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
