import React, { useContext } from 'react'
import { Navbar,Stack,Nav,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'


function NavBar() {
  const {user,logoutUser}=useContext(AuthContext)
  return (
    <Navbar bg="dark" className="mb-4" style={{height:"3.75rem"}} >
<Container>
    <h2>
       <Link to={"/"} className='link-light text-decoration-none'>Phonegram</Link>
    </h2>
   {user?<span>Login as {user.name}</span>:""} 
    <Nav>
        <Stack direction='horizontal' gap={3}>
        {
          user && (<>
            <Link to={"/login"} onClick={()=>logoutUser()}  className='link-light text-decoration-none '>Logout</Link>
          </>)
        }
        {!user &&  <Link to={"/login"} className='link-light text-decoration-none '>Login</Link>}
       
        
        </Stack>
    </Nav>
</Container>
    </Navbar>
  )
}

export default NavBar