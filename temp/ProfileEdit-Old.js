import React from 'react'
import { Button, Card, Col, Container, Form, Nav, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { cover1,profile } from '../../assets';
import Todo from '../../todo'
const ProfileEdit = () => {
  return (
    <ProEdit>
   <Container fluid="xl" className='px-4 mt-4'>
   <Nav variant="tabs" border="dark" defaultActiveKey="/profileedit" className='nav-borders'>
      <Nav.Item>
        <Nav.Link href="#" eventKey="link-1" target="__blank">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#" eventKey="link-2" target="__blank">Medecine</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#" eventKey="link-3" target="__blank">Care Points</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#" eventKey="link-4" target="__blank">Scheduleings</Nav.Link>
      </Nav.Item>
    </Nav>
    <hr className="mt-0 mb-4"/>
    <Row>
        <Col xl={4}>
            <Card className='mb-4 mb-xl-0'>
                <Card.Header>Profile Picture</Card.Header>
                <Card.Body className='text-center'>
                    <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                    <button className="btn btn-primary" type="button">Upload new image</button>
                </Card.Body>
            </Card>
        </Col>
        <Col xl={8}>
            <Card className="mb-4">
            <Card.Header>User Details</Card.Header>
                <Card.Body className='text-center'>
                    <Form>
                        <Row className="gx-3 mb-3">
                            <Col md={6}>
                                <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie"/>
                            </Col>
                            <Col md={6}>
                                <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"/>
                            </Col>
                        </Row>
                        <Row className="gx-3 mb-3">
                            <Col md={6}>
                                <label className="small mb-1" htmlFor="inputOrgName">Date of Birth</label>
                                <input className="form-control" id="dob"  type='date' value='2022-01-01'/>
                            </Col>
                            <Col md={6}>
                                <label className="small mb-1" htmlFor="inputLocation">Gender</label>
                                <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="Male"/>
                            </Col>
                        </Row>
                        <Row className="gx-3 mb-3">
                            <Col md={6}>
                                <label className="small mb-1" htmlFor="inputOrgName">Blood Group</label>
                                <input className="form-control" id="dob"  type='Text' value='O'/></Col>
                            <Col md={6}>
                                <label className="small mb-1" htmlFor="inputLocation">Consulting Doctor</label>
                                <input className="form-control" id="inputLocation" type="text" placeholder="Consulting Doctor" value="Dr. ABC XZ"/>
                            </Col>
                        </Row>
                        <Row className="gx-3 mb-3">
                            <Col md={6}>
                                <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567"/>
                            </Col>
                            <Col md={6}>
                                <label className="small mb-1" htmlFor="inputBirthday">Location</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="India"/>
                            </Col>
                        </Row>
                        <Row className="gx-3 mb-3 ">
                            <Col>
                                <label className="small mb-1" htmlFor="inputEmailAddress">Address</label>
                                <input className="form-control" id="inputEmailAddress" type="text" placeholder="address" value="B45 lucknow"/>
                            </Col>
                        </Row>
                            <button className="btn btn-primary" type="button">Save changes</button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
   </Container>
   <div className="container-xl px-4 mt-4">
    <nav className="nav nav-borders">
        <a className="nav-link active ms-0" href="#" target="__blank">Profile</a>
        <a className="nav-link" href="#" target="__blank">Medecine</a>
        <a className="nav-link" href="#" target="__blank">Care Points</a>
        <a className="nav-link" href="#"  target="__blank">Scheduleings</a>
    </nav>
    <hr className="mt-0 mb-4"/>
    <div className="row">
        <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                    <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                    <button className="btn btn-primary" type="button">Upload new image</button>
                </div>
            </div>
        </div>
        <div className="col-xl-8">
            <div className="card mb-4">
                <div className="card-header">User Details</div>
                <div className="card-body">
                    <form>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie"/>
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"/>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputOrgName">Date of Birth</label>
                                <input className="form-control" id="dob"  type='date' value='2022-01-01'/>
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLocation">Gender</label>
                                <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="Male"/>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputOrgName">Blood Group</label>
                                <input className="form-control" id="dob"  type='Text' value='O'/>
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLocation">Consulting Doctor</label>
                                <input className="form-control" id="inputLocation" type="text" placeholder="Consulting Doctor" value="Dr. ABC XZ"/>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567"/>
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputBirthday">Location</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="India"/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputEmailAddress">Address</label>
                            <input className="form-control" id="inputEmailAddress" type="text" placeholder="address" value="B45 lucknow"/>
                        </div>
                        <button className="btn btn-primary" type="button">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>



{/* <div className="col-xl-8">
            <div className="card mb-4 mb-xl-0">
                <div className="row gx-3 mb-3">
                            <div className="col-md-5">
                                <label className="small mb-1" for="inputFirstName">Medicine name</label>
                                <textarea className="form-control" id="inputFirstName"  placeholder="Enter your first name" value="Valerie" cols="30" rows="1"></textarea>
                            </div>
                            <div className="col-md-2">
                                <label className="small mb-1" for="inputLastName">Dosage</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"/>
                            </div>
                            <div className="col-md-2">
                                <label className="small mb-1" for="inputLastName">Frequency</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"/>
                            </div>
                            <div className="col-md-2">
                                <label className="small mb-1" for="inputLastName">Add</label>
                                <input className="form-control" id="inputLastName" type="submit" placeholder="Add" value="Add"/>
                            </div>
                </div>
            </div>
        </div> */}

{/* <div className="col-xl-8">
            <div className="card mb-4 mb-xl-0">
                <div className="row gx-3 mb-3">
                            <div className="col-md-5">
                                <textarea className="form-control" id="inputFirstName"  placeholder="Enter your first name" value="Valerie" cols="30" rows="1"></textarea>
                            </div>
                            <div className="col-md-2">
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"/>
                            </div>
                            <div className="col-md-2">
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"/>
                            </div>
                            <div className="col-md-2">
                                <input className="form-control" id="inputLastName" type="submit" placeholder="Add" value="Add"/>
                            </div>
                </div>
            </div>
            
        </div>  */}
{/* <Todo/> */}
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
    @media (max-width: 940px) {
        padding:  0px;
    }
    .img-account-profile{
        width: -webkit-fill-available;
        width: 10em;

        height: 10em;
    }
    
`