import { Card, Col, Container, Form, Row,Button,ListGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { cover1, dotloader, empty,avatarM } from '../../../assets';
import {AiOutlineDelete} from "react-icons/ai"
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import {BiAddToQueue} from 'react-icons/bi'
import { useState,useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Toast } from 'primereact/toast';
import { useEffect } from 'react';
import { onSnapshot,collection,query,where } from 'firebase/firestore';
import { db,auth } from '../../../firebase/firebase';
import EditNav from './EditNav';

const MedicineEdit = () => {
    const toast = useRef(null);
    const {updateMedicines} = useAuth();
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [medicine, setMedicine] = useState("")
    const [medicines, setMedicines] = useState([])
    const [loading, setloading] = useState(false);
    const [avatar, setAvatar] = useState({
        avatar:`${avatarM}`,
        avatarPath:''
      })
    const [currentuser, setCurrentuser] = useState({name:''})

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "user"),where('uId','==',`${auth.currentUser.uid}`)), (docs) => {
            docs.forEach((doc) => {
               setMedicines(doc.data().medicineList || [])
               setAvatar(doc.data().Avatar)
               setCurrentuser({name:`${doc.data().firstName+" "+doc.data().lastName}`})
            });
        });        
        return unsub;
    }, []);

    const addMedicine=()=>{
        const tempPoint=[...medicines];
        tempPoint.push({
          id:Date.now()+""+Math.floor(Math.random()*78),
          text:medicine,
          time:Date.now()
        });
        setMedicines(tempPoint);
    }
    const deleteMedicine=(id)=>{
        const tempPoint=[...medicines];
        const index=tempPoint.findIndex(item=>item.id===id)
        if(index<0) return;
        tempPoint.splice(index,1);
        setMedicines(tempPoint);
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
            if(medicine!==''){
                addMedicine();
                setMedicine('')
                setDisplayResponsive(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Added', life: 3000 });
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
            if(medicines!==''){
                setloading(true);
                await updateMedicines(medicines);
                setloading(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Added', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'warn', summary: 'Warn message', detail: 'Error', life: 3000 });
            console.log(error.message)
        }
    }
  return (
    <MedEdit>
       <Toast ref={toast} />
        <Container fluid="xl" className='px-4 mt-4'>        
            <EditNav/>
            <hr className="mt-0 mb-4"/>
            <Dialog header="Add Medicines" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooter('displayResponsive')}>
                <Form.Label className="small mb-1" htmlFor="medicinename">Medicine Name</Form.Label>
                <Form.Control name='medicinename' onChange={(e)=>setMedicine(e.target.value)} type='text'  id="medicinename"/>
            </Dialog>
            <Row>
                <Col xl={3} sm={0} md={3} >
                    <Card className='mb-4 mb-xl-0 d-none d-lg-block'>
                        <Card.Header>Profile Picture</Card.Header>
                        <Card.Body className='text-center'>
                            <img className="img-account-profile rounded-circle mb-2 w-100 ps-5 pe-5" src={avatar.avatar?avatar.avatar:avatarM} alt="avatar"/>
                            <div className="small font-italic text fs-4 mb-0">{currentuser.name}</div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={9} md={9}>
                    <Card className="mb-4">
                    <Card.Header>Medicines
                        <Button variant='white' className='float-end fs-6' onClick={() => onClick('displayResponsive')}><BiAddToQueue /> add</Button>
                    </Card.Header>
                        <Card.Body className='text-start'>
                            <Form onSubmit={handleSubmit}>                   
                                <ListGroup variant="flush" as="ol" numbered >
                                    {
                                        (medicines.length<1)?<img src={empty} className='empty' alt="no medecines found" />:medicines.map((i,k)=>{
                                            return <ListGroup.Item key={k} style={{width:'100%'}} >{i.text}<Button onClick={()=>deleteMedicine(i.id)} className='float-end'  variant="light"><AiOutlineDelete/></Button></ListGroup.Item>
                                        })
                                    }
                                   </ListGroup>
                                   <div className='d-flex justify-content-around mt-2'>
                                    <Link to='/profile' replace>
                                    <button className="btn btn-primary" type="button">Cancel</button></Link>
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
    </MedEdit>
  )
}

export default  MedicineEdit;

const MedEdit = styled.div`
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