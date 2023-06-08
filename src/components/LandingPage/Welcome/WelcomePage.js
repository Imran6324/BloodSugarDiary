import { Container,Row,Col } from 'react-bootstrap'
import styled from 'styled-components'
import {  cover2, coversvg } from '../../../assets'
import {FiChevronsRight} from "react-icons/fi"

const WelcomePage = () => {
  return (
    <Welcome id='Home'>
        <Container>
          <Row>
            <Col className='text-start d-flex flex-column justify-content-center align-items-start up'>
              <h1 className=''>Welcome To Blood Sugar Diary </h1>
              <h3 className='mt-3 up'>We offer modern solutions for managing your blood glucose test results.</h3>
              {/* <Link to={'/login'}> */}
                <a href="#Service">
                <button  type="button" className="btn btn-primary btn-md-md btn-lg-lg mt-4 up">Know more <FiChevronsRight className='ms-1 my-auto fs-4'/></button>
             </a> 
             {/* </Link> */}
            </Col>
            <Col className='px-2 cover-container d-flex flex-column justify-content-center align-items-center'>
            <img src={coversvg} alt="hey" className='cover up sh'  />
            </Col>
          </Row>
        </Container>
        </Welcome>
  )
}

export default WelcomePage

const Welcome = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: -webkit-fill-available;
    height: 100vh;
    padding: 20px;
    background: url(${cover2});
    background: transparent;
    background-size: cover;
    background-position: top;
    .sh:hover{
      transition: 0.8s;
    transform: scale(1.05);
    }
    .up{ 
    animation-name: up;
    animation-duration: 2s;
   opacity: 1;
    }
    @keyframes up {
  from { 
    opacity: 0;
    transition: 1.8s;
    transform: translateY(148px);
}
  to {
    transition: 1.8s;
    transform: translateY(0px);
    opacity: 1;
}
    }
h1{
    font-size: 54px;
    font-weight: 700;
    color: #012970;
    margin: 0px;
    font-family: 'PT Sans Narrow', sans-serif;
    line-height: 1.2;
}
h2{
    color: #444444;
    margin: 15px 0 0 0;
    font-size: 26px;
    line-height: 1.2;
    font-weight: 300;
    font-family: 'Nunito Sans', sans-serif;
}
h3{
  font-weight: 400;
}
.cover{
    height: auto;
    width: auto;

}
@media (max-width: 940px) {
    h1{
    font-size: 32px;
}
    h2{
        font-size: 24px;
    }
    
    }
    @media (max-width: 780px) {
        .cover-container{
            margin-top: 2rem;
        }
        .cover{
            height: 10rem;
            width: 10rem;
        }
}
 `