import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { cover2, wavy } from "../../assets";
import Feature from "./Features/Feature";
import LandingNavbar from "./LandingNav/LandingNavbar";
import Services from "./OurServices/Services";
import ScrollButton from "./ScrollButton";
import Response from "./Response/Response";
import WelcomePage from "./Welcome/WelcomePage";
import WhoweAre from "./WhoweAre/WhoweAre";
const LandingPage = () => {
  return (
    <Landing>
      <div className="land">
        <LandingNavbar />
        <WelcomePage />
      </div>
      <Services />
      <Feature />
      <WhoweAre />
      <div className="home" id="Home">
        <h1 className="mb-4 start">Navigate to Home</h1>
        <Link to={"/welcome"}>
          <Button variant="primary" className="mt-2" size="lg">
            Click To Start
          </Button>
        </Link>
      </div>
      <Response />
      <ScrollButton />
    </Landing>
  );
};

export default LandingPage;

const Landing = styled.div`
  width: -webkit-fill-available;

  .land {
    width: -webkit-fill-available;
    padding: 20px;
    /* background: url(https://i.imgur.com/73BxBuI.png); */
    background: url(${cover2});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

  }
  .home {
    display: flex;
    width: -webkit-fill-available;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    /* padding-top: 2em; */
    align-content: center;
    justify-content: center;
    /* justify-content: center; */

    background: url(${wavy});
    background-size: cover;
    background-position: center;
    padding: 20px;
    margin: 0px auto;
    min-height: 700px;
  }
  .start {
    font-size: 54px;
    font-weight: 700;
    color: #012970;
    margin: 0px;
    font-family: "PT Sans Narrow", sans-serif;
    line-height: 1.2;
  }
`;
