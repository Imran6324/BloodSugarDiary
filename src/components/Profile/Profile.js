import {Button, Col, Container, Row,Card,Table,ListGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { avatarM, cover1,empty } from '../../assets';
import { Link, useNavigate } from 'react-router-dom'
import {MdOutlineEditNote} from 'react-icons/md'
import { useEffect, useState } from 'react';
import { onSnapshot,query,where,collection } from 'firebase/firestore';
import { db,auth } from '../../firebase/firebase';
import { useAuth } from '../../context/AuthContext';

export const Profile = () => {
    const {logOut} =useAuth()
    const history = useNavigate()
    async function handleLogout() {
        try {
            console.log('Logout')
          await logOut()
          history("/", { replace: true })
        } catch (err) {
          console.log(err.message);
        }
      }
    const [userData, setuserData] = useState({
        firstName:"",
        lastName:"",
        dob:"",
        gender:"",
        bloodGroup:"",
        Consultant:"",
        phNumber:"",
        location:"",
        address:"",
        lastAppointment:"not set",
        nextAppointment:"not set",
        carePoints:[],
        medicineList:[],
        Dtype:"",
        Avatar:{
            avatar:`${avatarM}`,
            avatarPath:''
          }
    })
    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "user"),where('uId','==',auth.currentUser.uid)), (docs) => {
            docs.forEach((doc) => {
               setuserData(doc.data())
            });
        });        
        return unsub;
      }, []);
      
      const {firstName,lastName,dob,gender,bloodGroup,Consultant,
        phNumber,address,lastAppointment,nextAppointment,carePoints,medicineList,Avatar,Dtype}=userData;

        const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

  return (
    <ProfileCom>
        <Container fluid>
            <Row style={{disply:'flex', justifyContent:'flex-end'}}>
                <Col className='d-block d-md-none d-lg-none '>
                    <Button onClick={()=>handleLogout()} className='mt-3 mt-md-1 mt-lg-1 float-end mb-0 fs-7 mx-1' variant="primary ">Log Out</Button>
                </Col>
                <Col className='d-none d-md-block d-lg-block ' >
                    <Link to='/profileedit'><Button className='mt-3 mt-md-1 mt-lg-1 float-end mb-0' variant="primary  "><MdOutlineEditNote/> Edit</Button></Link>
                </Col>
            </Row>

            <Row style={{disply:'flex', justifyContent:'center'}}>
                <Col xs={11} md={3} xl={3}>
                    <Card className='mb-2 mb-xl-2 mt-3  box'>
                        <Card.Header>User Details
                        <Link to='/profileedit'><Button variant="primary edit d-block d-md-none d-lg-none "><MdOutlineEditNote/> Edit</Button>
                        </Link>
                        </Card.Header>
                        <Card.Body className='text-center'>
                            <img className="img-account-profile rounded-circle mb-2" src={Avatar.avatar?Avatar.avatar:avatarM} alt=""/>
                            <div className="small font-italic text fs-4 mb-0">{firstName+" "+lastName}</div>
                        </Card.Body>
                    </Card>
                    <Card className='mb-4 mb-xl-0  box'>
                        <Card.Body className='text-start'>
                    <Table  hover responsive size="sm" className='fs-6'>
                    <tbody>
                    <tr className='text-right'>
                        <th>Gender</th>
                        <td>{gender}</td>
                        <th>Age</th>
                        <td>{dob!==""?getAge(dob):'-'}</td>
                    </tr>
                    <tr>
                        <th colSpan={2}>Blood Group</th>
                        <td colSpan={2}>{bloodGroup}</td>
                    </tr>
                    <tr>
                        <th colSpan={2}>Diabetes Type</th>
                        <td colSpan={2}>{Dtype}</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>Consultant</th>
                        <td colSpan={3}>{Consultant}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td colSpan={3}>{address}</td>
                    </tr>
                    <tr>
                        <th>Contact</th>
                        <td colSpan={3}>{phNumber}</td>
                    </tr>
                    </tbody>
                    </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-start side2 mt-lg-3" xs={11} md={7}>
                {/* <hr className='d-none d-lg-block'/> */}
                <Card className='box '>
                        <Card.Header>Appointments</Card.Header>
                        <Card.Body>
                        <Table   hover responsive size="sm" className='fs-6 fs-sm-7'>
                            <tbody>
                                <tr>
                                    <td>Last Appointment</td>
                                    <td>{lastAppointment}</td>
                                </tr>
                                <tr>
                                    <td>Next Appointment</td>
                                    <td>{nextAppointment}</td>
                                </tr>
                            </tbody>
                        </Table>
                        </Card.Body>
                    </Card>
                <Card className='box mt-2'>
                    <Card.Header>Medicines Prescribed</Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush" as="ol" numbered>
                            {
                                medicineList.length>0?medicineList.map((i)=>{
                                    return <ListGroup.Item key={i.id}>{i.text}</ListGroup.Item>
                                }):<img src={empty} className='empty' alt="no care points added" />
                            }
                        </ListGroup>
                    </Card.Body>
                </Card>
                       
                    <Card className=' box mt-2'>
                        <Card.Header>Care Points</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush" as="ol" numbered>
                                {
                                    carePoints.length>0?carePoints.map((i)=>{
                                        return <ListGroup.Item key={i.id}>{i.text}</ListGroup.Item>
                                    }):<img src={empty} className='empty' alt="no care points added" />
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    <hr/>
                </Col>
            </Row>
        </Container>
    </ProfileCom>
  )
}
export default Profile;

const ProfileCom = styled.div`
    background: url(${cover1});
    background-size: auto;
    background-repeat: no-repeat;
    padding: 20px;
    height: -webkit-fill-available;
    width: -webkit-fill-available;
    height: fit-content;
    .edit{
        position: absolute !important;
        right: 10px !important;
        top: 8px !important;
        padding: 1px 6px !important;
        font-size: small !important;
    }
    .box{
        background: white;
    border-radius: 13px;
    box-shadow: 0 0 11px 1px #bfadadab;
    }
    .boxsh{
        box-shadow: 0 0 11px 1px #bfadadab;
    }
    .side2{
        height: 95vh;
        overflow-y: scroll;
        overflow-x:hidden;
    }
    .side2::-webkit-scrollbar {
        width: 8px;     
        scroll-behavior: smooth;          /* width of the entire scrollbar */
    }
    .side2::-webkit-scrollbar-track {
        background: rgba(106, 116, 110, 0.186);        /* color of the tracking area */
    }
    .img-account-profile{
        width: -webkit-fill-available !important;
        width: 9.5em !important;
        height: 9.5em !important;
    }
    .empty{
        width: 400px !important;
        height: auto;
        margin: auto;
    }
    @media (max-width: 940px) {
        padding:  0px;
        padding-bottom: 4em;
        .empty{
            width: -webkit-fill-available !important;
        }
    }
`