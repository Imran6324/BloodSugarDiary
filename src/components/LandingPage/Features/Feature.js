import ScrollAnimation from "react-animate-on-scroll";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { wavy3, f1, f2, f3, f4, f5, f6 } from "../../../assets";

const Feature = () => {
  const feature = [
    {
      fName: "User Friendly Design",
      fImg: `${f1}`,
      fp1: "We tried to provide a clean, simple User-friendly design for fast access of user information. the core features of this website can be accessed through a home page.",
      fdir: "",
    },
    {
      fName: "Clean Maintainable Records",
      fImg: `${f2}`,
      fp1: "Users are allowed to create,update and delete records according to there use. here user is provided to choose between two type of records namely Random(for random readings) and Routine(for 3 times in day type.)",
      fdir: "-reverse",
    },
    {
      fName: "Add Readings Directly",
      fImg: `${f3}`,
      fp1: "One of the core feature of Blood Sugar Diary is to add readings directly to records with even opening them. this will easy user to add readings to records just by choosing few options. the organization of readings will be managed in background.  ",
      fdir: "",
    },
    {
      fName: "Routine Test Table",
      fImg: `${f4}`,
      fp1: "Routine Table consist of user test results taken 3 times in a day include Breakfast, Lunch, Dinner including the before and after meal option. Also user can add, delete, and update record from here.",
      fdir: "-reverse",
    },
    {
      fName: "Random Test Table",
      fImg: `${f5}`,
      fp1: "With Random Test Table user can add test results which are taken randomly at any time of the day, the test time and date with result will be included as the entry in the table .Also support add, delete, and update test results.",
      fdir: "",
    },
    {
      fName: "Customizable Detailed Profile",
      fImg: `${f6}`,
      fp1: "Blood Sugar Diary provide an interactive user detail page where user can maintain the list of medicine list, add care point and add basic or necessary details about him.",
      fdir: "-reverse",
    },
    {
      fName: "Print Pdf of Reports",
      fImg: "http://static1.squarespace.com/static/5f7f7efd51d63f47eee1cdcd/5f7f7ff15265a43e66d19ca0/5f8087e1aa2865548472d81b/1602290435681/SOM_SlowGIF.gif?format=1500w",
      fp1: "User can take a direct print of the record tables and present those print before his respective consultant if required.",
      fdir: "",
    },
  ];

  return (
    <FeaComp id="Features">
      <Container>
        <Row>
          <Col className="underline">
            <h2>Features</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="section-subtitle text-muted text-center px-lg-5 pt-4 font-secondary">
              To replace the traditional management and maintainance of test records we
              provide you the digital alternative.
            </p>
          </Col>
        </Row>
        <Container className="mt-5">
          {/* <Row className='fbox'>
            <Col>
              <h2 style={{textAlign:'justify'}}>Feature name</h2>
              <p style={{textAlign:'justify'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut doloremque minima provident nulla? Illum 
                ipsam a ullam odio quidem placeat, omnis eius tempore, saepe pariatur veniam id corrupti aliquid ipsum.</p>
            </Col>
            <Col>
              <img src={f1} style={{width:'auto'}} alt="" />
            </Col>
          </Row> */}
          {feature.map((i, k) => {
            return (
              <ScrollAnimation
                animateIn="fadeIn"
                animateOnce={true}
                key={k}
                style={{ transition: "0.8s" }}
              >
                <Row className={`fbox mb-3 d-flex flex-row-reverse${i.fdir}`}>
                  <Col>
                    <h2 className="f" style={{ textAlign: "justify" }}>
                      {i.fName}
                    </h2>
                    <p style={{ textAlign: "justify" }}>{i.fp1}</p>
                  </Col>
                  <Col>
                    <img className="fimg" src={i.fImg} alt="" />
                  </Col>
                </Row>
              </ScrollAnimation>
            );
          })}
        </Container>
      </Container>
    </FeaComp>
  );
};

export default Feature;

const FeaComp = styled.div`
  padding-top: 8em;
  width: -webkit-fill-available;
  height: 100vh;
  margin: auto;
  background: url(${wavy3});
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
  @media (max-width: 940px) {
    .form {
      width: -webkit-fill-available;
      img {
        height: 13rem;
        width: -webkit-fill-available;
      }
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

  img {
    height: 15rem;
    width: auto;
    transition: 0.8s;
  }
  .fbox {
    background: #f6f9ff;
    padding: 55px 40px;
    box-shadow: 0 0 20px 10px #b9e2f4;
  }
  .f {
    background: linear-gradient(var(--color), var(--color)) var(--position) /
      var(--width) var(--height) no-repeat;
    padding-bottom: 10px;
    font: bold 2rem sans-serif;
    font-variant-caps: petite-caps;
    color: #0042cf;
    text-shadow: -8px 6px 2px #dbedf7;
  }
  .fimg:hover {
    transition: 0.8s;
    transform: scale(1.2);
    cursor: pointer;
  }
  @media (max-width: 940px) {
    img {
      height: 12rem;
      width: -webkit-fill-available;
    }
    img {
      width: -webkit-fill-available;
      height: fit-content;
      transition: 0.8s;
    }
    .fbox {
      padding: 35px 40px;
    }
  }
`;
