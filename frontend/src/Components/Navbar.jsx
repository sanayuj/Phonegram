import React from 'react'
import { Navbar,Stack,Nav,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <Navbar bg="dark" className="mb-4" style={{height:"3.75rem"}} >
<Container>
    <h2>
       <Link to={"/"} className='link-light text-decoration-none'>Phonegram</Link>
    </h2>
    {/* <span>Hi, this is me</span> */}
    <Nav>
        <Stack direction='horizontal' gap={3}>
        <Link to={"/login"} className='link-light text-decoration-none '>Login</Link>
        
        </Stack>
    </Nav>
</Container>
    </Navbar>
  )
}

export default NavBar