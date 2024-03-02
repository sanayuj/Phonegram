import React from 'react'
import { Link } from 'react-router-dom'
import { Alert,Button,Form,Row,Col,Stack } from 'react-bootstrap'
function Login() {
  return (
    <Form>
    <Row style={{
        height:"100vh",
        justifyContent:"center",
        paddingTop:"10%"
    }}>
        <Col xs={6}>
            <Stack gap={3}>
    <h2>Login</h2>

    <Form.Control type='email' placeholder='Email'/>
    <Form.Control type='password' placeholder='Password'/>
    <Button variant='primary' type='submit'>Login</Button>
    <p className='link-light text-decoration-none '> Don't have an account<Link to={"/register"} className='link-light '> Register </Link></p>
<Alert variant='danger'>
    Error msg
</Alert>
            </Stack>
        </Col>
    </Row>
   </Form>
  )
}

export default Login