import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { cover1, dotloader,avatarM } from '../../../assets';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState,useRef } from 'react';
import { onSnapshot,query,where,collection } from 'firebase/firestore';
import { db,auth,storage } from '../../../firebase/firebase';
import { Toast } from 'primereact/toast';
import {ref,getDownloadURL,uploadBytes} from "firebase/storage"
import {IoMdArrowBack} from 'react-icons/io'
import EditNav from './EditNav';
const ProfileEdit = () => {
    const [userImg, setUserImg] = useState('')
    const toast = useRef(null);
    const {updateUserProfile,updateProfileImg} =useAuth()
    const [loading, setloading] = useState(false);
    const [imgLoad, setimgLoad] = useState(false);
    const [userData, setuserData] = useState({
        uId:"",
        firstName:"",
        lastName:"",
        dob:"",
        gender:"",
        bloodGroup:"",
        Consultant:"",
        phNumber:"",
        location:"",
        address:"",
        lastAppointment:"",
        nextAppointment:"",
        Dtype:"",
        Avatar:{
            avatar:`${avatarM}`,
            avatarPath:''
          }
    })
    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "user"),where('uId','==',`${auth.currentUser.uid}`)), (docs) => {
            docs.forEach((doc) => {
               setuserData(doc.data())
            });
        });        
        return unsub;
      }, []);
      
    const {firstName,lastName,dob,gender,bloodGroup,Consultant,
    phNumber,location,address,Avatar,Dtype}=userData;

  const  handleChange=async(e)=>{
    setuserData({...userData,[e.target.name]:e.target.value})
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        if(userData){
            setloading(true);
            await updateUserProfile(userData)
            setloading(false);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Added', life: 3000 });
        }
    } catch (error) {
        toast.current.show({ severity: 'warn', summary: 'Successful', detail: error.message, life: 3000 });
        console.log(error.message)
    }
  }
  useEffect(() => {
    if(userImg){
        setimgLoad(true)
        const uploadImg=async()=>{
            // const imgRef = ref(storage,`avatar/${new Date().getTime()} - ${userImg.name}`);
            const imgRef = ref(storage,`avatar/${auth.currentUser.uid} - ${userImg.name}`);
            try {
                const snap = await uploadBytes(imgRef,userImg)
                const url = await getDownloadURL(ref(storage,snap.ref.fullPath))
                await updateProfileImg({avatar:url,avatarPath:snap.ref.fullPath})
                setimgLoad(false)
            } catch (error) {
               console.log(error.message) 
            }
        }
        uploadImg();
    }
  }, [userImg])
  
  return (
    <ProEdit>
    <Toast ref={toast} />
   <Container fluid="xl" className='px-4 mt-4'>
   <EditNav/>
    <hr className="mt-0 mb-4"/>
    <Row>
        <Col xl={4}>
            <Card className='mb-4 mb-xl-0'>
                <Card.Header>Profile Picture
                <Link to='/profile' replace={true} className='position-absolute top-0 start-0 py-2 px-2 d-block d-md-none d-lg-none'><IoMdArrowBack/>back</Link>
                </Card.Header>
                <Card.Body className='text-center'>
                    <img className="img-account-profile rounded-circle mb-2" src={Avatar.avatar?Avatar.avatar:avatarM} alt=""/>
                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                    {/* <button className="btn btn-primary" type="button">Upload new image</button> */}
                    <label htmlFor="photo">
                        <p className="btn btn-primary" >
                            {
                                imgLoad?<img  width={40} src={dotloader} height={20} alt="load" />:'Upload new image'
                            }
                        </p>
                        <input onChange={(e)=>setUserImg(e.target.files[0])} style={{display:'none'}} type="file" accept='image/*' className="btn btn-primary" name="" id="photo" />
                    </label>
                </Card.Body>
            </Card>
            <Card className='mt-3 mb-3 mb-xl-0'>
                <Card.Header>Select Diabeties type</Card.Header>
                <Card.Body className='text-center'>
                    <Row className="gx-3 mb-3 ">
                        <Col>
                            <Form.Select aria-label="Default select type" name='Dtype' value ={Dtype} onChange={handleChange}>
                                <option value="null">Select Type</option>
                                <option value="1">1.Severe Autoimmune Diabetes</option>
                                <option value="2">2.Severe Insulin-Deficient Diabetes</option>
                                <option value="3">3.Severe Insulin-Resistant Diabetes</option>
                                <option value="4">4.Mild Obesity-Related Diabetes</option>
                                <option value="5">5.Mild Age-Related Diabetes </option>
                                <option value="none">none</option>
                            </Form.Select>
                        </Col>        
                    </Row>
                </Card.Body>
            </Card>
        </Col>
        <Col xl={8}>
            <Card className="mb-4">
            <Card.Header>User Details<Link to='/profile' replace className='position-absolute top-0 end-0 py-2 px-2 d-none d-md-block d-lg-block'><IoMdArrowBack/>back</Link></Card.Header>
                <Card.Body className='text-center'>
                    <Form onSubmit={handleSubmit}>
                        <Row className="gx-3 mb-3">
                            <Col md={6} className="text-start">
                                <Form.Label className="small mb-1"  htmlFor="inputFirstName">First name</Form.Label>
                                <Form.Control name='firstName' value ={firstName} onChange={handleChange} id="inputFirstName" type="text" placeholder="Enter your first name"/>
                            </Col>
                            <Col md={6} className="text-start">
                                <Form.Label className="small mb-1" htmlFor="inputLastName">Last name</Form.Label>
                                <Form.Control name='lastName' value ={lastName} onChange={handleChange} id="inputLastName" type="text" placeholder="Enter your Last name"/>
                            </Col>
                        </Row>
                        <Row className="gx-3 mb-3">
                            <Col md={6} className="text-start">
                                <Form.Label className="small mb-1" htmlFor="inputDob">Date of Birth</Form.Label>
                                <Form.Control name='dob' value ={dob} onChange={handleChange} type='date'  id="inputDob"/>
                            </Col>
                            <Col md={6} className="text-start">
                                <Form.Label className="small mb-1" htmlFor="inputLocation">Gender</Form.Label>
                                <Form.Select aria-label="Default select example" name='gender' value ={gender} onChange={handleChange}>
                                    <option value=''>open select menu</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="gx-3 mb-3">
                            <Col md={6} className="text-start">
                                <Form.Label className="small mb-1" htmlFor="inputBG">Blood Group</Form.Label>
                                <Form.Select name='bloodGroup' value ={bloodGroup} onChange={handleChange} aria-label="Default select example">
                                    <option value=''>open select menu</option>
                                    <option value="A+">A+</option>
                                    <option value="O+">O+</option>
                                    <option value="B+">B+</option>
                                    <option value="AB+">AB+</option>
                                    <option value="A-">A-</option>
                                    <option value="O-">O-</option>
                                    <option value="B-">B-</option>
                                    <option value="AB-">AB-</option>
                                </Form.Select>
                            </Col>
                            <Col md={6} className="text-start">
                                <Form.Label className="small mb-1" htmlFor="inputDoctorname">Consulting Doctor</Form.Label>
                                <Form.Control name='Consultant' value ={Consultant} onChange={handleChange}  id="inputDoctorname" type="text" placeholder="Consulting Doctor Name"/>
                            </Col>
                        </Row>
                        <Row className="gx-3 mb-3">
                            <Col md={6} className="text-start">
                                <Form.Label className="small mb-1" htmlFor="inputPhone">Phone number</Form.Label>
                                <Form.Control name='phNumber' value ={phNumber} onChange={handleChange} id="inputPhone" type="tel" placeholder="Enter your Phone number"/>
                            </Col>
                            <Col md={6} className="text-start">
                                <Form.Label className="small mb-1" htmlFor="inputLocation">Location</Form.Label>
                                <Form.Control name='location' value ={location} onChange={handleChange} id="inputLocation" type="text" placeholder="Enter your Location"/>
                            </Col>
                        </Row>
                        <Row className="gx-3 mb-3 ">
                            <Col>
                                <Form.Label className="small mb-1" htmlFor="inputAddress">Address</Form.Label>
                                <Form.Control name='address' value ={address} onChange={handleChange} id="inputAddress" type="text" placeholder="Enter your address"/>
                            </Col>
                        </Row>
                        <div className='d-flex justify-content-around'>
                            <Link to='/profile' replace><button className="btn btn-primary" type="button">Cancel</button></Link>
                            <button className="btn btn-primary" type="submit">
                                {
                                    loading?<img width={40} src={dotloader} height={20} alt="" />:'Save Changes'
                                }
                            </button>
                        </div>     
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
   </Container>
</ProEdit>
  )
}

export default ProfileEdit

const ProEdit = styled.div`
    background: url(${cover1});
    background-size: auto;
    background-repeat: no-repeat;
    height: -webkit-fill-available;
    width: -webkit-fill-available;
    a{
        text-decoration: none;
        color: black;
    }
    @media (max-width: 940px) {
        padding:  0px;
    }
    .img-account-profile{
        width: -webkit-fill-available;
        width: 10em;

        height: 10em;
    }
    
`