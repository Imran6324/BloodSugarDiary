import { Card, Col, Container, Form, Row,Button,ListGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { cover1, dotloader, empty,avatarM } from '../../../assets';
import {AiOutlineDelete} from "react-icons/ai"
import { Link } from 'react-router-dom';
import { useState,useRef,useEffect} from 'react';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import {BiAddToQueue} from 'react-icons/bi'
import { useAuth } from '../../../context/AuthContext';
import { onSnapshot,collection,query,where } from 'firebase/firestore';
import { db,auth } from '../../../firebase/firebase';
import EditNav from './EditNav';

const CareEdit = () => {
    const toast = useRef(null);
    const {updateCarePoints}=useAuth();
    const [loading, setloading] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [point, setPoint] = useState("")
    const [points, setPoints] = useState([]);
    const [avatar, setAvatar] = useState({
        avatar:`${avatarM}`,
        avatarPath:''
      })
      const [currentname, setCurrentname] = useState({name:''})

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "user"),where('uId','==',`${auth.currentUser.uid}`)), (docs) => {
            docs.forEach((doc) => {
               setPoints(doc.data().carePoints || [])
               setAvatar(doc.data().Avatar)
               setCurrentname({name:`${doc.data().firstName+" "+doc.data().lastName}`})
            });
        });        
        return unsub;
    }, []);

    const addPoint=()=>{
        const tempPoint=[...points];
        tempPoint.push({
          id:Date.now()+""+Math.floor(Math.random()*78),
          text:point,
          time:Date.now()
        });
        setPoints(tempPoint);
    }
    const deletePoint=(id)=>{
        const tempPoint=[...points];
        const index=tempPoint.findIndex(item=>item.id===id)
        if(index<0) return;
        tempPoint.splice(index,1);
        setPoints(tempPoint);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Point removed', life: 3000 });
    }
    const onClick = () => {
        setDisplayResponsive(true);
    }
    const onHide = () => {
        setDisplayResponsive(false);
    }
    const onSub = async () => {
        try {
            if(point!==''){
                addPoint();
                setDisplayResponsive(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Added', life: 3000 });
                setPoint('')
            }
            else{
                toast.current.show({ severity: 'warn', summary: 'Warn message', detail: 'Field is empty', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'warn', summary: 'Warn message', detail: 'Error', life: 3000 });
            console.log(error.message)
        }
        
    }
    const renderFooter = () => {
        return (
            <div>
                <Button  onClick={() => onHide()} className="">Cancel</Button>
                <Button  onClick={() => onSub()} className="">Add</Button>
            </div>
        );
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            if(points!==''){
                setloading(true);
                await updateCarePoints(points);
                setloading(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Added', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'warn', summary: 'Warn message', detail: 'Error', life: 3000 });
            console.log(error.message)
        }
    }
  return (
    <Careedit>
        <Toast ref={toast} />
        <Container fluid="xl" className='px-4 mt-4'>
        <EditNav/>
        <Dialog header="Add Medicines" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooter('displayResponsive')}>
            <Form.Label className="small mb-1" htmlFor="medicinename">Medicine Name</Form.Label>
            <Form.Control name='medicinename' onChange={(e)=>setPoint(e.target.value)} type='text'  id="medicinename"/>
        </Dialog>
    <hr className="mt-0 mb-4"/>
    <Row>
        <Col xl={3} md={3}>
            <Card className='mb-4 mb-xl-0 d-none d-lg-block'>
                <Card.Header>Profile Picture</Card.Header>
                <Card.Body className='text-center'>
                    <img className="img-account-profile rounded-circle mb-2 w-100 ps-5 pe-5" src={avatar.avatar?avatar.avatar:avatarM} alt="avatar"/>
                    <div className="small font-italic text fs-4 mb-0">{currentname.name}</div>
                </Card.Body>
            </Card>
        </Col>
        <Col xl={9} md={8}>
            <Card className="mb-4">
            <Card.Header>Care Points
                <Button variant='white' className='float-end fs-6' onClick={() => onClick('displayResponsive')}><BiAddToQueue /> add</Button>
            </Card.Header>
                <Card.Body className='text-start'>
                    <Form onSubmit={handleSubmit}>                   
                        <ListGroup variant="flush" as="ol" numbered >
                            {
                                points.length<1?<img src={empty} className='empty' alt="no points found" />:points.map((i,k)=>{
                                    return <ListGroup.Item key={k} style={{width:'100%'}} >{i.text}<Button onClick={()=>deletePoint(i.id)} className='float-end'  variant="light"><AiOutlineDelete/></Button></ListGroup.Item>
                                })
                            }
                            </ListGroup>
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
    <hr />
   </Container>
    </Careedit>
  )
}

export default CareEdit

const Careedit = styled.div`
    background: url(${cover1});
    background-size: auto;
    background-repeat: no-repeat;
    height: -webkit-fill-available;
    width: -webkit-fill-available;
    .img-account-profile{
        width: -webkit-fill-available;
        width: 10em;
        height: 10em;
    }
    .empty{
        width: 400px !important;
        height: auto;
        margin: auto;
    }
    @media (max-width: 940px) {
        padding:  0px;
        .empty{
            width: -webkit-fill-available !important;
        }
    }
    
    
    
`