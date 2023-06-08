import { Container,Button,Nav,Navbar } from 'react-bootstrap';
import styled from 'styled-components'
import  {Link}  from "react-router-dom";
import { useState } from 'react';
const LandingNavBar = () => {
    const[navbar,setNavbar]=useState(true);
    const changeBackground=()=>{
        if(window.scrollY>=80){
            setNavbar(false);
        } else{
            setNavbar(true);
        }
     }
     window.addEventListener('scroll',changeBackground);
  return (
    <NavCom>
        <Navbar className={navbar?'nav':'nav act .active'} fixed="top"  collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
            <Link  to='/' ><Navbar.Brand className={navbar?'title':'title titleactive'} >Blood Sugar Diary</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
                <p ><Nav.Link className='me-lg-4 fs-6' href="#Home">Home</Nav.Link></p>
                <p className='me-lg-4 fs-6' > <Nav.Link href="#Service">Services</Nav.Link></p>
                <p className='me-lg-4 fs-6' ><Nav.Link href="#Features">Features</Nav.Link></p>
                <p className='me-lg-4 fs-6'  ><Nav.Link href="#about">About</Nav.Link></p> 
                <Link className='me-lg-4 ' to='/welcome' ><Button variant="primary" className='fs-6'>Login</Button></Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </NavCom>
  );
}

export default LandingNavBar
const NavCom = styled.div`
    width: -webkit-fill-available;

a{
  text-decoration: none;
  color: black;
}
.title{
    font-family: 'Roboto',sans-serif;
    /* color: #373737; */
    font-size: x-large;
    font-variant-caps: petite-caps;
    font-weight: bolder;
    color: #3bc3ff;
    color: #0d6efd;
}
@media (max-width: 350px) {
    .title{font-size: large;}
  }
/* .nav{
    background: linear-gradient(13deg, rgb(106, 251, 249), rgb(241, 254, 254));
    background: linear-gradient(271deg, rgb(106, 251, 249), rgb(241, 254, 254));
    background: linear-gradient(72deg, rgb(137, 245, 244), rgb(241, 254, 254));
    background: linear-gradient(72deg,rgb(160 230 255),rgb(209 240 252));
} */
.bg-light,.nav {
    --bs-bg-opacity: 0 !important;
    background-color: transparent !important;
}
.act{
    background: linear-gradient(72deg,rgb(160 230 255),rgb(209 240 252));
}
.active{
    border-bottom: 3px solid #0d6efd;
    border-radius: 1px;
}
.titleactive{
    color: black;
}
@media (max-width: 940px) {
    .active{
    border-bottom: 3px solid #0d6efd;
    border-radius: 1px;
    background: white;
}
.navbar-nav{
    background: linear-gradient(72deg,rgb(160 230 255),rgb(209 240 252));
}
.act{
    background: linear-gradient(72deg,rgb(160 230 255),rgb(209 240 252));
}
  }

`