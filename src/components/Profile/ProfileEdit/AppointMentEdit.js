import { Card, Col, Container, Form,Row } from 'react-bootstrap'
import styled from 'styled-components'
import { cover1,avatarM, dotloader } from '../../../assets';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState,useRef } from 'react';
import { onSnapshot,query,where,collection } from 'firebase/firestore';
import { db,auth } from '../../../firebase/firebase';
import { Toast } from 'primereact/toast';
import EditNav from './EditNav';

const AppointMentEdit = () => {
    const toast = useRef(null);
    const {updateUserProfile} = useAuth()
    const [loading, setloading] = useState(false);
    const [avatar, setAvatar] = useState({
        avatar:`${avatarM}`,
        avatarPath:''
      })
    const [schedulingInfo, setSchedulingInfo] = useState({
        lastAppointment:"",
        nextAppointment:"",
        firstName:"",
        lastName:""
    })
    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "user"),where('uId','==',auth.currentUser.uid)), (docs) => {
            docs.forEach((doc) => {
                setSchedulingInfo(doc.data())
                setAvatar(doc.data().Avatar)
            });
        });        
        return unsub;
      }, []);
    const {lastAppointment,
    nextAppointment,firstName,lastName}=schedulingInfo;

  const  handleChange=(e)=>{
    setSchedulingInfo({...schedulingInfo,[e.target.name]:e.target.value})
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        if(schedulingInfo.lastAppointment<=schedulingInfo.nextAppointment){
           setloading(true)
            await updateUserProfile(schedulingInfo)
            setloading(false)
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Appointments setted', life: 3000 });
        }else {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Past date not allowed', life: 3000 });
        }
        } catch (error) {
        console.log(error.message)
        toast.current.show({ severity: 'warn', summary: 'Warning', detail: error.message, life: 3000 });

    }
  }
  return (
    <Appedit>
     <Toast ref={toast} />
        <Container fluid="xl" className='px-4 mt-4  '>
        <EditNav/>
    <hr className="mt-0 mb-4"/>
    <Row>
        <Col xl={3} md={3}>
            <Card className='mb-4 mb-xl-0 d-none d-lg-block'>
                <Card.Header>Profile Picture</Card.Header>
                <Card.Body className='text-center'>
                        <img className="img-account-profile rounded-circle mb-2 w-100 ps-5 pe-5" src={avatar.avatar?avatar.avatar:avatarM} alt="avatar"/>
                        <div className="small font-italic text fs-4 mb-0">{firstName+" "+lastName}</div>
                </Card.Body>
            </Card>
        </Col>
        <Col xl={9} md={9}>
            <Card className="mb-4">
            <Card.Header>Set and Update Appointments</Card.Header>
                <Card.Body className='text-center'>
                    <Form onSubmit={handleSubmit}>
                        <Row className="gx-3 mb-3">
                            <Col md={6} className="text-start">
                                <Form.Label className="small mb-1"  htmlFor="lastAppointment">Last Appointment Date</Form.Label>
                                <Form.Control name='lastAppointment' value={lastAppointment} onChange={handleChange} id="lastAppointment" type="date" required />
                            </Col>
                            <Col md={6} className="text-start">
                                <Form.Label className="small mb-1" htmlFor="nextAppointment">Next Appointment Date</Form.Label>
                                <Form.Control name='nextAppointment' value={nextAppointment} onChange={handleChange}  id="nextAppointment" type="date" required/>
                            </Col>
                        </Row>
                        <div className='d-flex justify-content-around mt-2'>
                            <Link to='/profile' replace><button className="btn btn-primary" type="button">Cancel</button></Link>
                            <button className="btn btn-primary" type="submit">
                                {
                                    loading?<img  width={40} src={dotloader} height={20} alt="load" />:'Save Changes'
                                }
                            </button>
                        </div>                    
                         </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    <hr className="mt-4 mb-4"/>

    </Container>
</Appedit>
  )
}

export default AppointMentEdit


const Appedit = styled.div`

background: url(${cover1});
    background-size: auto;
    background-repeat: no-repeat;
height: -webkit-fill-available;
    width: -webkit-fill-available;
    @media (max-width: 940px) {
        padding:  0px;
    }
    .img-account-profile{
        width: -webkit-fill-available;
        width: 10em;

        height: 10em;
    }
    
`