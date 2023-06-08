import {Button, Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { cover1,profile } from '../src/assets';
import { Link } from 'react-router-dom'
export const Profile = () => {
  return (
    <ProfileCom>
        <Container fluid>
            <Row style={{disply:'flex', justifyContent:'flex-end'}}>
                <Col style={{textAlign: '-webkit-right',margin:5}} >
                    <Link to='/profileedit'><Button variant="primary">Edit</Button></Link>
                </Col>
                 </Row>
            <Row style={{disply:'flex', justifyContent:'center'}}>
                <Col className="  " xs={10} md={3}>
                    <img style={{width:'90%'}} height={250} src={profile} alt="profile" />
                    <hr/>
                    <Container className='box' fluid>
                    <Row className="">
                        <Col className=" fs-5 text-start ">Name:</Col>
                        <Col className=" fs-5 fw-bold text-start">John Dove</Col>
                    </Row>
                    <Row className="">
                        <Col>
                            <Row>
                                <Col className=" fs-5 text-start ">Age:</Col>
                                <Col className=" fs-5 fw-bold text-start">82</Col>
                            </Row>
                        </Col>
                        <Col className=" fs-5 text-start ">Blood Group: A</Col>
                    </Row>
                    <Row className="">
                        <Col>
                            <Row>
                                <Col className=" fs-5 text-start ">Gender:</Col>
                                <Col className=" fs-5 fw-bold text-start">M</Col>
                            </Row>
                        </Col>
                        <Col className=" fs-5 text-start ">DType: 2</Col>
                    </Row>
                    <Row className="">
                        <Col className=" fs-5 text-start ">Contact:</Col>
                        <Col className=" fs-5 text-start">1234567890</Col>
                    </Row>
                    <Row className="">
                        <Col className=" fs-5 text-start ">Consultant</Col>
                        <Col className=" fs-5 text-start">Dr.XYX ABC AAAAA</Col>
                    </Row>
                    <Row className="">
                        <Col className=" fs-5 text-start ">Address:</Col>
                        <Col className=" fs-5 text-start">Up, Lucknow</Col>
                    </Row>
                    </Container>
                    <hr/>
                    </Col>



                <Col className=" " xs={10} md={9}>
                <hr/>
                     <Container className='box' fluid>
                        <Row className="">
                            <Col className=" fs-5 text-start ">Medicines Prescribed</Col>
                        </Row>
                        <Row className="">
                            <Container  fluid >
                                <Col className=" fs-5 text-start ">1.insulin isophane (Humulin N, Novolin N)</Col>
                                <Col className=" fs-5 text-start">2.insulin glargine (Toujeo)</Col>
                                <Col className=" fs-5 text-start ">3.Pramlintide (SymlinPen 120, SymlinPen 60)</Col>
                                <Col className=" fs-5 text-start">4.acarbose (Precose)</Col>
                            </Container>
                        </Row>
                    </Container>    
                    <hr/>
                    <Container className='box' fluid>
                    <Row className="">
                        <Col className=" fs-5 text-start ">Care Points</Col>
                        <Container>
                            <Col className=" fs-5 text-start ">1.Daily Exercise</Col>
                            <Col className=" fs-5 text-start">2.Routine Checkups</Col>
                            <Col className=" fs-5 text-start ">3.Maintaining reports</Col>
                            <Col className=" fs-5 text-start">4.Controlled diet</Col>
                        </Container>
                    </Row></Container>
                    <hr/>
                    <Container className='box' fluid>
                    <Row className="">
                        <Col className=" fs-5 text-start ">Others</Col>
                    </Row>
                    <Row className="">
                    <Container>
                    <Row>
                        <Col className=" fs-5 text-start ">Last Doctor's Visit:</Col>
                        <Col className=" fs-5 text-start">21/4/2021</Col></Row>
                        </Container>
                        <Container>
                            <Row>
                        <Col className=" fs-5 text-start ">Next Doctor's Visit:</Col>
                        <Col className=" fs-5 text-start">26/6/2021</Col>
                        </Row>
                        </Container>
                    </Row>
                    </Container>
                    <hr/>
                </Col>
            </Row>
        </Container>
    </ProfileCom>
  )
}
export default Profile
const ProfileCom = styled.div`
background: url(${cover1});
    background-size: auto;
    background-repeat: no-repeat;
padding: 20px;
height: -webkit-fill-available;
    width: -webkit-fill-available;
    @media (max-width: 940px) {
        padding:  0px;
    }
    .box{
        background: white;
    padding: 15px;
    border-radius: 13px;
    box-shadow: 0 0 11px 1px #bfadadab;
    }
`