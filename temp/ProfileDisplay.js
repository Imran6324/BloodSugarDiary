import { Button, Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { cover1,profile } from '../../assets';
export const Profile = () => {
  return (
    <ProfileCom>
        <Container fluid>
            <Row style={{disply:'flex', justifyContent:'flex-end'}}>
                <Col style={{textAlign: '-webkit-right',margin:5}} ><Button variant="primary">Edit</Button></Col>
                 </Row>
            <Row style={{disply:'flex', justifyContent:'center'}}>
                <Col className="border border-primary  " xs={10} md={3}>
                    <img style={{width:'90%'}} height={250} src={profile} alt="profile" />
                    <hr/>
                    </Col>
                <Col className="border border-primary " xs={10} md={9}>
                    <Row className="border border-primary">
                        <Col className="border border-primary fs-2 fw-bold text-start ">John Dove</Col>
                        <Col className="border border-primary fs-5 text-start">36</Col>
                    </Row>
                    <Row className="border border-primary">
                        <Col className="border border-primary fs-5 text-start ">Blood Group: A</Col>
                        <Col className="border border-primary fs-5 text-start">Gender: M👨</Col>
                    </Row>
                    <Row className="border border-primary">
                        <Col className="border border-primary fs-5 text-start ">Contact: 1234567890</Col>
                        <Col className="border border-primary fs-5 text-start">Adrerss:Lucknow YP</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </ProfileCom>
  )
}
export default Profile

const ProfileCom = styled.div`
padding: 20px;
height: 100vh;
    width: -webkit-fill-available;
`