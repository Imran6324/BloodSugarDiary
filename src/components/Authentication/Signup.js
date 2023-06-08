import styled from "styled-components";
import React, { useRef, useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { join, login, add_post, authcover } from "../../assets";
import Carousel from "react-bootstrap/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const signPasswordRef = useRef();
  const signEmailRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { signUp, addUser } = useAuth();
  const [sques, setSques] = useState("");
  const [sanswer, setAnswer] = useState("");
  const onSignIn = async (e) => {
    e.preventDefault();
    const SigninDetails = {
      firstName: `${firstNameRef.current.value}`,
      lastName: `${lastNameRef.current.value}`,
      signPassword: `${signPasswordRef.current.value}`,
      signEmail: `${signEmailRef.current.value}`,
      securityQ: `${sques}`,
      securityA: `${sanswer}`,
    };
    console.log(SigninDetails);
    try {
      setError("");
      setLoading(true);
      await signUp(signEmailRef.current.value, signPasswordRef.current.value);
      await addUser(SigninDetails);
      history("/welcome", { replace: true });
    } catch (err) {
      // setError("Failed to create an account")
      setError(err.message);
    }

    setLoading(false);
  };
  return (
    <Log>
      <section className="body">
        <Container>
          <div className="login-box">
            <Row>
              <Col sm={6}>
                <div className="logo">
                  <Link to={"/"} replace className="home">
                    {" "}
                    <span className="logo-font">Blood Sugar</span>Diary
                  </Link>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                sm={6}
                className="hide-on-mobile  px-0 px-sm-0 px-md-5 px-lg-5 pop"
              >
                <div id="demo" className="carousel slide " data-ride="carousel">
                  <Carousel variant="dark">
                    <Carousel.Item interval={1000}>
                      <img
                        className="d-block w-100 img"
                        src={join}
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3>Authorized and secure</h3>
                        <p>
                          Nulla vitae elit libero, a pharetra augue mollis
                          interdum.
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                      <img
                        className="d-block w-100 img"
                        src={login}
                        alt="Second slide"
                      />
                      <Carousel.Caption>
                        <h3>Store</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 img"
                        src={add_post}
                        alt="Third slide"
                      />
                      <Carousel.Caption>
                        <h3>Organised</h3>
                        <p>
                          Praesent commodo cursus magna, vel scelerisque nisl
                          consectetur.
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </Col>
              <Col sm={6} className="px-0 px-sm-0 px-md-5 px-lg-5">
                <br />
                <div className="right">
                  <Card>
                    <Card.Body>
                      <h2 className="text-center mb-4">Sign Up</h2>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form onSubmit={onSignIn}>
                        <Form.Group style={{ textAlign: "left" }} id="email">
                          <Row>
                            <Col>
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="Text"
                                data-testid="Reg_first_name"
                                ref={firstNameRef}
                                required
                              />
                            </Col>
                            <Col>
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                type="Text"
                                data-testid="Reg_last_name"
                                ref={lastNameRef}
                                required
                              />
                            </Col>
                          </Row>
                          {/* <Form.Label>First Name</Form.Label>
                                    <Form.Control type="Text" data-testid="Reg_name"  required /> */}
                        </Form.Group>
                        <Form.Group style={{ textAlign: "left" }} id="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            data-testid="Reg_email"
                            ref={signEmailRef}
                            required
                          />
                        </Form.Group>
                        <Form.Group style={{ textAlign: "left" }} id="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            data-testid="Reg_password"
                            ref={signPasswordRef}
                            required
                          />
                          {/* <div id="passwordHelpBlock" className="form-text fs-10">
                                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                        </div> */}
                          <Form.Label>Enter a security </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => setSques(e.target.value)}
                          >
                            <option value="">Open this select menu</option>
                            <option value="What is your favourite color?">
                              What is your favourite color?
                            </option>
                            <option value="What is your favourite food?">
                              What is your favourite food?
                            </option>
                            <option value="What was your school name?">
                              What was your school name?
                            </option>
                            <option value="Where was your mother born?">
                              Where was your mother born?
                            </option>
                          </Form.Select>
                          <Form.Control
                            type="Text"
                            data-testid="answer"
                            className={sques ? "d-block mt-3" : "d-none"}
                            placeholder="answer"
                            required
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                        </Form.Group>
                        <Button
                          disabled={loading}
                          className="w-100 mt-3"
                          type="submit"
                        >
                          Sign Up
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                  <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                  </div>
                </div>
                <div id="passwordHelpBlock" className="form-text">
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </Log>
  );
};

export default Signup;

const Log = styled.div`
  .home {
    text-decoration: none;
  }

  .right {
    animation-name: right;
    animation-duration: 1.5s;
    opacity: 1;
  }
  @keyframes right {
    from {
      opacity: 0;
      transition: 1.2s;
      transform: translateX(-100px);
    }
    to {
      transition: 1.2s;
      transform: translateX(0px);
      opacity: 1;
    }
  }

  .img {
    display: flex;
    border: 1px solid #a0e6ff;
    border-radius: 10px;
    background: #fff;
    height: 25em !important;
  }
  .carousel-dark .carousel-caption {
    color: #000 !important;
    backdrop-filter: blur(2px) !important;
    /* box-shadow: 0 0 20px 0px #00000014 !important; */
    margin: 0px -16px !important;
    width: -webkit-fill-available !important;
    padding: 0px 0px !important;
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
    font-family: "Caveat", cursive;
    font-size: 54px;
    text-align: center;
    color: #888888;
    margin-bottom: 50px;
  }

  .logo .logo-font {
    color: #3bc3ff;
  }

  @media only screen and (max-width: 767px) {
    .logo {
      font-size: 34px;
    }
  }

  .header-title {
    text-align: center;
    margin-bottom: 50px;
  }

  .login-form {
    max-width: 300px;
    margin: 0 auto;
  }

  .login-form .form-control {
    border-radius: 0;
    margin-bottom: 30px;
  }

  .login-form .form-group {
    position: relative;
  }

  .login-form .form-group .forgot-password {
    position: absolute;
    top: 6px;
    right: 15px;
  }

  .login-form .btn {
    border-radius: 0;
    -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }

  .login-form .btn.btn-primary {
    background: #3bc3ff;
    border-color: #31c0ff;
  }

  .slider-feature-card {
    background: #fff;
    max-width: 280px;
    margin: 0 auto;
    padding: 30px;
    text-align: center;
    -webkit-box-shadow: 0 2px 25px -3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 25px -3px rgba(0, 0, 0, 0.1);
  }

  .slider-feature-card img {
    height: 80px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .slider-feature-card h3,
  .slider-feature-card p {
    margin-bottom: 30px;
  }

  .carousel-indicators {
    bottom: -50px;
  }

  .carousel-indicators li {
    cursor: pointer;
  }
`;
