import { Route,Routes,Navigate } from "react-router-dom"
import Chat from "./Pages/Chat"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap';
import Navbar from "./Components/Navbar"
import { useContext } from "react"
import { AuthContext } from "./Context/AuthContext"
import { ChatContextProvider } from "./Context/ChatContext"
function App() {

const {user}=useContext(AuthContext)
  return (
    <>
<ChatContextProvider user={user}>
    <Navbar/>
    <Container className="text-secondary">
    <Routes>
      <Route path="/" element={user ? <Chat/> : <Login/>}/>
      <Route path="/register" element={user ? <Chat/> :<Register/>}/>
      <Route path="/login" element={user ? <Chat/> :<Login/>}/>
      <Route path="*" element={<Navigate to={"/"}/>}/>

    </Routes>
    </Container>
    </ChatContextProvider>
    </>
  )
}

export default App
