import { Col, Container, Row, Button, ListGroup, Form } from "react-bootstrap";
import styled from "styled-components";
import { cover1, dotloader } from "../../assets";
import { useState, useRef, useEffect } from "react";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { Toast } from "primereact/toast";

const ReadingAdd = () => {
  const { addDirectResult } = useAuth();
  const toast = useRef(null);
  // const [recordField, setrecordField] = useState(false);
  const [loading, setloading] = useState(false);
  const [readingType, setReadingType] = useState("");
  const [recordfile, setRecordFile] = useState("");
  const recordRef = useRef();
  const readingTypeRef = useRef();
  const resultRef = useRef();
  const testDateRef = useRef();
  const testTimeRef = useRef();
  const notesRef = useRef();

  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate());

  let currentTime = defaultDate.toString().substring(16, 21);

  const [resultDate, setDate] = useState(
    defaultDate.toLocaleDateString("en-CA")
  );
  const [resultTime, setTime] = useState(currentTime);

  const onSetResultTime = (event) => {
    setTime(event.target.value);
  };
  const onSetResultDate = (event) => {
    setDate(event.target.value);
  };

  //    useEffect(() => {
  //      if(recordfile!=='' || recordfile!=='Select Type'){
  //         setrecordField(true);
  //      }else{
  //         setrecordField(false);
  //      }
  //    }, [readingTypeRef])

  const [allRecords, setallRecords] = useState(
    JSON.parse(localStorage.getItem("random-records")) || []
  );
  useEffect(() => {
    const unsub = onSnapshot(
      collection(doc(db, "allRecord", auth.currentUser.uid), "records"),
      (docs) => {
        const rec = [];
        docs.forEach((doc) => {
          rec.push({ ...doc.data(), docId: doc.id });
        });
        setallRecords(rec);
      }
    );
    return unsub;
  }, []);

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const onClear = (e) => {
    readingTypeRef.current.value = "";
    recordRef.current.value = "";
    resultRef.current.value = "";
    notesRef.current.value = "";
    setDate(defaultDate.toLocaleDateString("en-CA"));
    setTime(currentTime);
  };

  const onResultSubmit = async (e) => {
    e.preventDefault();
    const result = {
      id: createId(),
      readingType: `${readingTypeRef.current.value}`,
      docId: recordfile,
      result: `${resultRef.current.value}`,
      testDate: `${testDateRef.current.value}`,
      testTime: `${testTimeRef.current.value}`,
      description: `${notesRef.current.value}`,
    };
    try {
      if (result.readingType === "Select Type" || result.readingType === "") {
        toast.current.show({
          severity: "warn",
          summary: "Warn message",
          detail: "Select Type",
          life: 3000,
        });
      } else if (result.recordName === "Select Record" || result.recordName === "") {
        toast.current.show({
          severity: "warn",
          summary: "Warn message",
          detail: "Select Record",
          life: 3000,
        });
      } else if (result.result === "") {
        toast.current.show({
          severity: "warn",
          summary: "Warn message",
          detail: "Enter the test Result",
          life: 3000,
        });
      } else {
        setloading(true);
        console.log(result)
        await addDirectResult(result);
        setloading(false);
        onClear();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Result Added",
          life: 3000,
        });
      }
    } catch (er) {
      console.log(e.message);
    }
  };
  return (
    <AddComp>
      <Toast ref={toast} />

      <Form onSubmit={onResultSubmit}>
        <Container>
          <Row style={{ disply: "flex", justifyContent: "center" }}>
            <Col xs={10} md={8} className="box">
              <Container>
                <Row>
                  <Col>
                    <Form.Label className="d-none dmd-block d-lg-block">
                      Select Type
                    </Form.Label>
                    <Form.Select
                      ref={readingTypeRef}
                      onChange={(e) => {
                        setReadingType(e.target.value);
                      }}
                      className="m-sm-1 m-md-0 m-lg-0 input"
                      style={{ width: "-webkit-fill-available" }}
                      aria-label="Default select example"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Random">Random</option>
                      <option value="Bfast">Before BreakFast</option>
                      <option value="Bpp">After BreakFast</option>
                      <option value="Lfast">Before Lunch</option>
                      <option value="Lpp">After Lunch</option>
                      <option value="Dfast">Before Dinner</option>
                      <option value="Dpp">After Dinner</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label className="d-none dmd-block d-lg-block ">
                      Select Record
                    </Form.Label>
                    <Form.Select
                      disabled={
                        (readingType === "" || readingType === "Select Type")
                          ? true
                          : false
                      }
                      style={{ width: "11em" }}
                      onChange={(e) => setRecordFile(e.target.value)}
                      className="m-sm-1 m-md-0 m-lg-0 input fs-6"
                      ref={recordRef}
                      aria-label="Default select example"
                      required
                    >
                      <option className="fs-6" value="">Select Record</option>
                      {allRecords.map((i, k) => {
                        if (readingType === "Random") {
                          if (i.recordType.name === "Random")
                            return (
                              <option className="fs-6" key={k} value={i.docId}>
                                {i.recordName}
                              </option>
                            );
                        } else if (i.recordType.name !== "Random")
                          return (
                            <option className="fs-6" key={k} value={i.docId}>
                              {i.recordName}
                            </option>
                          );
                      })}
                    </Form.Select>
                  </Col>

                  <Col>
                    <Form.Group controlId="testdob">
                      <Form.Label className="d-none dmd-block d-lg-block">
                        Select Date
                      </Form.Label>
                      <Form.Control
                        className="m-sm-1 m-md-0 m-lg-0 input"
                        ref={testDateRef}
                        value={resultDate}
                        onChange={onSetResultDate}
                        style={{ width: "-webkit-fill-available" }}
                        type="date"
                        name="testdob"
                        placeholder="Date of test"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="testtime">
                      <Form.Label className="d-none dmd-block d-lg-block">
                        Select Time
                      </Form.Label>
                      <Form.Control
                        className="m-sm-1 m-md-0 m-lg-0 input"
                        style={{ width: "-webkit-fill-available" }}
                        type="time"
                        name="testtime"
                        value={resultTime}
                        placeholder="Time of test"
                        ref={testTimeRef}
                        onChange={onSetResultTime}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Label className="mt-2">
                      <h2>Enter Reading</h2>
                    </Form.Label>
                    <Form.Control
                      ref={resultRef}
                      className="readings"
                      type="number"
                      min="10"
                      maxLength="4"
                      max="3000"
                      placeholder="00"
                    />
                  </Col>
                  <Container className="mt-3">
                    <Row>
                      <Col>
                        <Button
                          variant="primary"
                          onClick={() => onClear()}
                          className="button"
                        >
                          Clear
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="primary"
                          disabled={loading}
                          className="button"
                          type="submit"
                        >
                          {loading ? (
                            <img
                              width={40}
                              src={dotloader}
                              height={20}
                              alt=""
                            />
                          ) : (
                            "Save"
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Row>
              </Container>
            </Col>
            <Col xs={10} md={3} className="box m-3">
              <Row>
                <Col className="fs-5 mb-2">Notes</Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    as="textarea"
                    ref={notesRef}
                    placeholder="Leave a note here"
                    style={{ height: "250px" }}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>You can store notes with readings.</Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container className="mt-5 mb-5">
          <Row style={{ disply: "flex", justifyContent: "center" }}>
            <Col
              xs={10}
              md={10}
              className="box ins"
              style={{ width: "fit-content" }}
            >
              <Col>
                <h1>Instructions</h1>
              </Col>
              <p>
                To make proper entries in records please follow following
                instructions
              </p>
              <ListGroup as="ol" style={{ textAlign: "left" }} numbered>
                <ListGroup.Item as="li">
                  Select the correct reading type amoung the given choices..
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Check for the record name before adding test results.
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Enter correct test results date and time.(by default current
                  date/time will be taken.)
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Adding a note with reading can be helpful while reading data.
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Form>
    </AddComp>
  );
};

export default ReadingAdd;
const AddComp = styled.div`
  width: -webkit-fill-available;
  padding: 30px;
  background: url(${cover1});
  background-size: auto;
  background-repeat: no-repeat;
  @media (max-width: 940px) {
    padding: 5px 0px;
    padding-top: 2em;
    .input {
      width: -webkit-fill-available !important;
      margin: 5px 0px !important;
    }
  }
  @media (max-width: 1080px) {
    .input {
      width: -webkit-fill-available !important;
      margin: 5px 0px !important;
    }
  }
  .box {
    background: white;
    padding: 15px;
    border-radius: 13px;
    box-shadow: 0 0 11px 1px #bfadadab;
  }
  .readings {
    height: 2em;
    font-size: 8em;
    text-align: center;
    width: -webkit-fill-available;
    margin: 10px auto;
  }
  .button {
    width: 8em;
  }
  @media (max-width: 940px) {
    .button {
      width: 5.5em;
    }
    .readings {
      font-size: 6em;
      margin: 10px auto;
    }
    .ins{
      margin: auto 2em;
      padding-bottom: 2em;
    }
  }
`;
