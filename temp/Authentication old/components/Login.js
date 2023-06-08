import React, { useRef, useState } from "react"
import styled from 'styled-components'
import { cover1 } from '../../../assets';

import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
// import GoogleButton from "react-google-button";
 const Login=()=> {
  const emailRef = useRef()
  const passwordRef = useRef()
  // const { login,googleSignIn } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    // try {
    //   setError("")
    //   setLoading(true)
    //   await login(emailRef.current.value, passwordRef.current.value)
    //   history("/")

    // } catch(err) {
    //   setError(err.message)

    // }

    setLoading(false)
  }
  // const handleGoogleSignIn = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await googleSignIn();
  //     history("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  return (
    <Log>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert data-testid='error' variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" data-testid="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control data-testid="password" type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} data-testid='submit' id='btnLogin' className="w-100 mt-3" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          {/* <div className="mx-auto my-3 ">
            <GoogleButton className='g-btn mx-auto ' type='dark'  onClick={handleGoogleSignIn}/>
          </div> */}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </Log>
  )
}

export default Login
const Log = styled.div`
 background: url(${cover1});
 background-size: auto;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    padding: 3em auto;
    height: 100vh;
    width: -webkit-fill-available;
    `