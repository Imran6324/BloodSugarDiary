import { useRef, useState } from "react"
import { Form, Button, Card, Alert,Container, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { authcover } from "../../assets"
import { useAuth } from "../../context/AuthContext"

export default function ForgotPassword() {

  const {resetPassword}= useAuth();
  const knownEmailRef = useRef()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(knownEmailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }
    setLoading(false)
  }

  return (
    <For>
    <section className="body">
        <Container>
        <div className="login-box">
            <div className="row">
                <Col sm={6} className='m-auto'>
                    <div className="logo ">
                        <Link to={'/'} className='home'><span className="logo-font">Blood Sugar</span>Diary </Link>  
                    </div>
                </Col>
            </div>
                <Row>
                    <Col sm={6} className="px-0 px-sm-0 px-md-5 px-lg-5  m-auto down-up">
                    <br/>
                    <Card>
                      <Card.Body>
                        <h2 className="text-center mb-4">Password Reset</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                          <Form.Group id="email">
                            <Form.Label>Enter the email</Form.Label>
                            <Form.Control type="email" ref={knownEmailRef} required />
                          </Form.Group>
                          <Button disabled={loading} className="w-100 my-3" type="submit">
                            Reset Password
                          </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                          <Link to="/login">Login</Link>
                        </div>
                      </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                      Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                    <div id="passwordHelpBlock mt-3" className="form-text">
                            A password reset mail will be sent to the register email.
                        </div>
                    </Col>
                    
                </Row>
          </div>
          </Container>
      </section>

      
    </For>
  )
}

const For = styled.div`

.home{
    text-decoration: none;
}

.down-up{ 
    animation-name: left;
    animation-duration: 1.5s;
   opacity: 1;
    }
    @keyframes left {
  from { 
    opacity: 0;
    transition: 1.2s;
    transform: translateY(110px);
}
  to {
    transition: 1.5s;
    transform: translateY(0px);
    opacity: 1;
}
    }








.img{
    display: flex;
    border: 1px solid #a0e6ff;
    border-radius: 10px;
    background: #fff;
    height: 25em !important;
}
width: 100%;
@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap);

body {
    background: #f5f5f5;
}

@media only screen and (max-width: 767px) {
    .hide-on-mobile {
        display: none;
    }
}

.login-box {
    background: url(${authcover});
    background-size: cover;
    background-position: center;
    padding: 20px;
    margin: 25px auto;
    min-height: 700px;
    -webkit-box-shadow: 0 2px 60px -5px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 60px -5px rgba(0, 0, 0, 0.1);
}

.logo {
    font-family: "Script MT";
    font-family: 'Caveat', cursive;
    font-size: 54px;
    text-align: center;
    color: #888888;
    margin-bottom: 50px;
}

.logo .logo-font {
    color: #3BC3FF;
}

@media only screen and (max-width: 767px) {
    .logo {
        font-size: 34px;
    }
}

`