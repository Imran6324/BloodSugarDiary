import { Col, Container, InputGroup, Row,Button ,Form} from 'react-bootstrap'
import styled from 'styled-components'
import {GrTwitter,GrInstagram, GrLinkedin } from 'react-icons/gr';
import { FaFacebookF } from 'react-icons/fa';
import { logo } from "../../assets";
import {auth} from "../../firebase/firebase"
import { useAuth } from '../../context/AuthContext';
import  {useNavigate}  from "react-router-dom";
import { Link } from 'react-router-dom';

const Footer = () => {
    const history = useNavigate()
    const {logOut}=useAuth()
    async function handleLogout() {
        try {
            console.log('Logout')
          await logOut()
          history("/", { replace: true })
        } catch (err) {
          console.log(err.message);
        }
      }
  return (
    <FCom>
        <Container>
            <Row>
                <Col lg={2} style={{width:'fit-content'}} className="d-flex flex-column align-items-start mb-5" >
                    <div className='align-self-center ' >
                        <a href="/" className="d-flex align-items-center p-0 text-dark">
                        <img alt="logo" src={logo} width="30px" />
                        <span className="ml-3 h5 font-weight-bold">Blood Sugar Diary</span>
                        </a>
                        <div className="d-flex mt-5">
                        {/* <Button flat="true" color="dark" className="bg-black border-dark px-3 py-2 d-flex align-items-center">
                            <FaFacebookF style={{fontSize:'0.8em'}}/>
                        </Button> */}

                        <a href="https://twitter.com/Mohamma19306624?t=74-6YxNZnsNeBzZBdJZGkA&s=09">
                        <Button flat="true" color="dark" className="bg-black border-dark px-3 py-2 d-flex align-items-center">
                        <GrTwitter style={{fontSize:'0.8em'}}/>
                        </Button>
                        </a>

                        <a href="https://www.instagram.com/i_.m_.r_.a_.n_/">
                        <Button flat="true" color="dark" className="bg-black border-dark mx-3 px-3 py-2 d-flex align-items-center">
                        <GrInstagram style={{fontSize:'0.8em'}}/>
                        </Button>
                        </a>
                        
                        <a href="https://www.linkedin.com/in/khan38imran/">
                        <Button flat="true" color="dark" className="bg-black border-dark px-3 py-2 d-flex align-items-center">
                        <GrLinkedin style={{fontSize:'0.8em'}}/>
                        </Button>
                        </a>
                        </div>
                    </div>
                </Col>
                <Col className="d-flex justify-content-evenly" style={{width:'100%'}}>
                <Col sm={5} lg={3}>
                <p className="h5 mb-4 text-start" style={{ fontWeight: '600' }}>
                    More
                </p>
                <div className="d-flex flex-column text-start mb-5" style={{ cursor: 'pointer' }}>
                    <a href="/">Resources</a>
                    <a href="https://www.linkedin.com/in/khan38imran/" target='_blank'  rel="noreferrer">About Us</a>
                    <a href="https://www.linkedin.com/in/khan38imran/" target='_blank'  rel="noreferrer">Contact</a>
                    <a href="https://capable-strudel-b280a6.netlify.app/">Blog</a>
                </div>
                </Col>
                <Col lg={3}>
                    <p className="h5 mb-4 text-start" style={{ fontWeight: '600' }}>
                    Help
                    </p>
                    <div className="d-flex flex-column text-start" style={{ cursor: 'pointer' }}>
                        <Link to='/profile' replace className={auth.currentUser?'block':'d-none'}>Profile</Link>
                        <a href="/">Support</a>
                        <Link to='/signup' replace className={auth.currentUser?'d-none':'block'} >Sign Up</Link>
                        <Link to='/login' replace className={auth.currentUser?'d-none':'block'} >Sign In</Link>
                        <p className={auth.currentUser?'block':'d-none'} onClick={()=>handleLogout()}>Log out</p>
                    </div>
                </Col>
                </Col>
                <Col lg={3}>
                    <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                        Subscribe
                    </p>
                    <div className="d-flex flex-column"  style={{ cursor: 'pointer' }}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="email" 
                            placeholder="email"
                            aria-label="email"
                            aria-describedby="basic-addon2"
                        />
                    <Button variant="outline-secondary" id="button-addon2">
                        Subscribe
                    </Button>
                    </InputGroup>
                    </div>
                </Col>
            </Row>
        </Container>


        <Row className="justify-content-center">
         <small className="text-center mt-5">&copy; <a style={{color:'black'}} href="https://www.linkedin.com/in/khan38imran/" target="_blank" rel="noopener noreferrer"> 
          Imran</a> , 2023. All rights reserved.</small>
        </Row>
    </FCom>
  )
}

export default Footer

const FCom = styled.div`
width: 100%;
padding-top: 4em;
padding-bottom: 2em;
    a{
        text-decoration: none;
        color: black;
        cursor: pointer;
    }
`