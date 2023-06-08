import {Container,Navbar,Nav,NavDropdown,Button,Row,Col,Card} from 'react-bootstrap';
import styled from 'styled-components'
import  {useNavigate}  from "react-router-dom";
import { IoIosLogOut } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../../context/AuthContext';
import {LinkContainer} from 'react-router-bootstrap'
import { Sidebar } from 'primereact/sidebar';
import { useEffect, useState } from 'react';
import { onSnapshot,query,where,collection } from 'firebase/firestore';
import { db,auth } from '../../firebase/firebase';
import { avatarM } from '../../assets';
const NavBar = () => {
    const history = useNavigate()
    const [visibleRight, setVisibleRight] = useState(false);
    // const [error, setError] = useState("")
    const {logOut} =useAuth()
    async function handleLogout() {
        try {
            console.log('Logout')
          await logOut()
          history("/", { replace: true })
        } catch (err) {
          console.log(err.message);
        }
      }
      const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        Avatar:{
            avatar:`${avatarM}`,
            avatarPath:''
        }
      })
      useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "user"),where('uId','==',auth.currentUser.uid)), (docs) => {
            docs.forEach((doc) => {
               setUser(doc.data())
            });
        });        
        return unsub;
      }, []);
      const {firstName,lastName,Avatar} = user;
  return (
    <NavCom>
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
       <Container>
        <Row>
        <Col>
            <Card className='mt-5 mb-4 mb-xl-0 d-none d-lg-block'>
                <Card.Header>Profile Sidebar</Card.Header>
                <Card.Body className='text-center'>
                        <img className="img-account-profile rounded-circle mb-2 w-100 ps-5 pe-5" src={Avatar.avatar?Avatar.avatar:avatarM} alt=""/>
                        <div className="small font-italic text fs-4 mb-0">{firstName+" "+lastName}</div>
                        <LinkContainer  to='/profile' onClick={() => setVisibleRight(false)} className='text-center mt-3'><Nav.Link><button className="btn btn-primary" type="button">View Profile</button></Nav.Link></LinkContainer>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
        </Sidebar>
        <Navbar sticky="top" className='nav'  collapseOnSelect expand="lg" bg="light" variant="light" >
        <Container>
            <LinkContainer  to='/welcome' ><Navbar.Brand className='title'>Blood Sugar Diary</Navbar.Brand></LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <LinkContainer  to='/addreadings'><Nav.Link>Add Reading</Nav.Link></LinkContainer>
            <LinkContainer  to='/listrecords'><Nav.Link>Show Records</Nav.Link></LinkContainer>
                <NavDropdown title="More" id="collasible-nav-dropdown">
                <LinkContainer  to='/routine_record'>
                    <NavDropdown.Item >Routine Records</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer  to='/random_record'>
                    <NavDropdown.Item>Random Records</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item href="https://www.linkedin.com/in/mohd-riyan-0330b4225/" target='_blank'>
                    Locate hospital
                </NavDropdown.Item>
                <LinkContainer  to='/graphs'><NavDropdown.Item href="#action/3.1">Graphs</NavDropdown.Item></LinkContainer>
                <NavDropdown.Item >Blogs</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://www.linkedin.com/in/mohd-riyan-0330b4225/" target='_blank'>
                    About Us
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                <LinkContainer  to='/profile' className='d-sm-block d-md-block d-lg-none ' >
                  <Nav.Link>
                  <CgProfile style={{fontSize:'larger',margin:'auto'}}/> Profile</Nav.Link></LinkContainer>
                  <Nav.Link className="mx-start-1 fs-6 ms-1 rightProfile d-sm-none d-md-none d-lg-block m-auto" onClick={() => setVisibleRight(true)}>
                  {
                    Avatar.avatar?<img src={Avatar.avatar?Avatar.avatar:avatarM} style={{borderRadius:20}} height={20} width={20} className='m-auto me-1' alt="" />
                    :<CgProfile  className="m-auto me-1" style={{fontSize:'larger',margin:'auto'}}/>
                  }
                    {/* <CgProfile style={{fontSize:'larger',margin:'auto'}}/>  */}
                    Profile
                  </Nav.Link>
                <Button variant="primary" className='fs-7 mx-1 my-auto d-none d-md-block d-lg-block ' onClick={()=>handleLogout()}> Logout <IoIosLogOut className='d-none mx-start-1 fs-5'/></Button>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </NavCom>
  );
}

export default NavBar
const NavCom = styled.div`
    width: -webkit-fill-available;

a{
  text-decoration: none;
  color: black;
}
.title{
    font-family: 'Roboto',sans-serif;
    color: #373737;
    font-size: x-large;
    font-variant-caps: petite-caps;
    font-weight: bolder;
}
@media (max-width: 350px) {
    .title{font-size: large;}
  }
  @media (max-width: 900px) {
    .rightProfile{
    display: none;
  }
  }
  
.nav{
    background: linear-gradient(13deg, rgb(106, 251, 249), rgb(241, 254, 254));
    background: linear-gradient(271deg, rgb(106, 251, 249), rgb(241, 254, 254));
    background: linear-gradient(72deg, rgb(137, 245, 244), rgb(241, 254, 254));
    background: linear-gradient(72deg,rgb(160 230 255),rgb(209 240 252));
}`