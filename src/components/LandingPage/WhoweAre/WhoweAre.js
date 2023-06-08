import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { groups } from "../../../assets";
const WhoweAre = () => {
  return (
    <Who id="about">
      <Container>
        <Row>
          <Col>
            <Container className="about text-start">
              <h3>Who we are</h3>
              <h2>
                we are a small talented hardwoking group of people who aspire to
                assist IT industry with new innovations.
              </h2>
              <p className="text-justify" style={{textAlign:'justify'}}>
                The idea behind this concept is to provide a helpful and easy
                alternative above the traditional unmanagable record sytem. This
                concept can be very helpful for those diabetic individuals who
                are required to take the blood glucose test frequently in a day
                and are required to keep record of each test result. the
                information generated from this web app can also be used by
                pharma companies in order to find thier medicines efficiency.
              </p>
              <p className="text-end mt-0 mb-0 text-uppercase font-italic">
                - Mohammad Imran Khan.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-md-md btn-lg-lg mt-4"
              >
                More..
              </button>
            </Container>
          </Col>
          <Col>
            <img src={groups} alt="" />
          </Col>
        </Row>
      </Container>
    </Who>
  );
};

export default WhoweAre;
const Who = styled.div`
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  padding: 6em 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-attachment: fixed;

  img {
    width: 480px;
    height: 350px;
  }
  @media (max-width: 550px) {
    img {
      width: -webkit-fill-available;
      height: auto;
    }
  }
  h3 {
    font-size: 14px;
    font-weight: 700;
    color: #4154f1;
    text-transform: uppercase;
  }
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #012970;
  }
  p {
    margin: 15px 0 30px 0;
    line-height: 24px;
  }
  .about {
    background-color: #f6f9ff;
    padding: 40px;
  }
`;
