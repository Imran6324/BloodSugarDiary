import { Container, Row, Col, Card } from "react-bootstrap";
import styled from "styled-components";
import { wavy } from "../../../assets";
import { IoAccessibilitySharp } from "react-icons/io5";
import { MdManageSearch } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {
  AiOutlineEdit,
  AiOutlineCloudUpload,
  AiFillRead,
} from "react-icons/ai";
import { GoGraph } from "react-icons/go";
const Services = () => {
  return (
    <Service id="Service">
      <Container>
        <Row>
          <Col className="underline">
            <h2>Services</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="section-subtitle text-muted text-center px-lg-5 pt-4 font-secondary">
              Blood Sugar Diary provide you various easy and useful multiple
              services for managing and presenting user's test results.
            </p>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Container>
            <Row xs={1} md={2} lg={4} className="g-4">
              <Col sx={3}>
                <Card className="sh">
                  <Card.Body>
                    <AiOutlineCloudUpload
                      style={{ fontSize: "3.5em", color: "#fcc220" }}
                    />
                    <Card.Title>Storage</Card.Title>
                    Cloud storage of test records.
                  </Card.Body>
                </Card>
              </Col>
              <Col sx={3}>
                <Card className="sh">
                  <Card.Body>
                    <AiOutlineEdit
                      style={{ fontSize: "3.5em", color: "rebeccapurple" }}
                    />
                    <Card.Title>Edit</Card.Title>
                    Make changes to records.
                  </Card.Body>
                </Card>
              </Col>
              <Col sx={3}>
                <Card className="sh">
                  <Card.Body>
                    <IoAccessibilitySharp
                      style={{ fontSize: "3.5em", color: "coral" }}
                    />
                    <Card.Title>Access</Card.Title>
                    Fast and Easy access of records.
                  </Card.Body>
                </Card>
              </Col>
              <Col sx={3}>
                <Card className="sh">
                  <Card.Body>
                    <AiFillRead
                      style={{ fontSize: "3.5em", color: "forestgreen" }}
                    />
                    <Card.Title>Readiblity</Card.Title>
                    Print and read data in tabular form.
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row
              xs={1}
              md={2}
              lg={3}
              className="g-4 mt-2 d-flex justify-content-center"
            >
              <Col sx={3}>
                <Card className="sh">
                  <Card.Body>
                    <GoGraph
                      style={{ fontSize: "3.5em", color: "lightslategrey" }}
                    />
                    <Card.Title>Graphs</Card.Title>
                    Generates graphs for better analysis.
                  </Card.Body>
                </Card>
              </Col>
              <Col style={{ maxWidth: "14em" }} sx={3}>
                <Card className="sh">
                  <Card.Body>
                    <MdManageSearch
                      style={{ fontSize: "3.5em", color: "#8eee31" }}
                    />
                    <Card.Title>Search and Filter</Card.Title>
                    Advanced search and filter support.
                  </Card.Body>
                </Card>
              </Col>
              <Col sx={3}>
                <Card className="sh">
                  <Card.Body>
                    <CgProfile
                      style={{ fontSize: "3.5em", color: "#06e1d5" }}
                    />
                    <Card.Title>Profile</Card.Title>
                    Create a detailed user profile.
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </Service>
  );
};

export default Services;

const Service = styled.div`
  background: url(${wavy});
  background-size: cover;
  background-position: center;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  margin: 0em auto;
  padding: 6em 0px;
  .sent {
    height: 15em;
    width: 100%;
  }
  .sh {
    box-shadow: 0px 0px 0px 0px #e9ecef;
  }
  .sh:hover {
    transition: 0.8s;
    box-shadow: 5px 6px 6px 2px #e9ecef;
    box-shadow: 0px 0px 20px 6px #a5e5f8a6;
    transform: scale(1.05);
  }
  @media (max-width: 940px) {
    height: -webkit-fill-available;

    .form {
      width: -webkit-fill-available;
    }
  }

  .underline {
    --color: red;
    --position: center bottom;
    --width: 100px;
    --height: 5px;
    background: linear-gradient(var(--color), var(--color)) var(--position) /
      var(--width) var(--height) no-repeat;
    padding-bottom: 10px;
    font: bold 2.5rem sans-serif;
  }
  p {
    letter-spacing: 0.02em;
    text-align: center !important;
    padding-top: 1.5rem !important;
  }
`;
