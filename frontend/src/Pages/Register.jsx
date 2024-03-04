import React from 'react'
import { Alert,Button,Form,Row,Col,Stack } from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function Register() {
    const {user}=useContext(AuthContext)
  return (
   <Form>
    <Row style={{
        height:"100vh",
        justifyContent:"center",
        paddingTop:"10%"
    }}>
        <Col xs={6}>
            <Stack gap={3}>
    <h2>Register</h2>
    <p>{user.name}</p>
    <Form.Control type='text' placeholder='Name'/>
    <Form.Control type='email' placeholder='Email'/>
    <Form.Control type='password' placeholder='Password'/>
    <Button variant='primary' type='submit'>Register</Button>
<Alert variant='danger'>
    Error msg
</Alert>
            </Stack>
        </Col>
    </Row>
   </Form>
  )
}

export default Register