import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
function Login() {
  const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } =
    useContext(AuthContext);
  return (
    <Form onSubmit={loginUser}>
      <Row
        style={{
          height: "100vh", 
          justifyContent: "center",
          paddingTop: "10%",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Login</h2>

            <Form.Control type="email" placeholder="Email" onChange={(e)=>{updateLoginInfo({...loginInfo,email:e.target.value})}}/>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>{updateLoginInfo({...loginInfo,password:e.target.value})}} />
            <Button variant="primary" type="submit">
            {isLoginLoading?"Loading":"Login"} 
            </Button>
            <p className="link-light text-decoration-none ">
              {" "}
              Don't have an account
              <Link to={"/register"} className="link-light ">
                {" "}
                Register{" "}
              </Link>
            </p>
            {loginError?<Alert variant="danger">{loginError?.message}</Alert>:""}
            
          </Stack>
        </Col>
      </Row>
    </Form>
  );
}

export default Login;
