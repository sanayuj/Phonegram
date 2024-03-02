import { Route,Routes,Navigate } from "react-router-dom"
import Chat from "./Pages/Chat"
import Register from "./Pages/Register"
import Login from "./Pages/Login"

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Chat/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<Navigate to={"/"}/>}/>

    </Routes>
    </>
  )
}

export default App
