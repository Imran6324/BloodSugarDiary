import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { coverrev } from "../../assets";
import RandomTable from "./RandomTable/RandomTable";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
const RandomComp = () => {
  const history = useNavigate();
  const params = useParams();

  const [allRecords, setallRecords] = useState(
    JSON.parse(localStorage.getItem("random-records")) || []
  );
  const [selectedRecordId, setSelectedRecordId] = useState("");
  useEffect(() => {
    const unsub = onSnapshot(
      collection(doc(db, "allRecord", auth.currentUser.uid), "records"),
      (docs) => {
        const rec = [];
        docs.forEach((doc) => {
          if (doc.data().recordType.name === "Random") {
            rec.push({ ...doc.data(), docId: doc.id });
          }
        });
        setallRecords(rec);
        if (params) {
          setSelectedRecordId(params.id);
        }
      }
    );
    // productService.getProducts2().then(data => console.log(data));
    return unsub;
  }, []);

  useEffect(() => {
    localStorage.setItem("random-records", JSON.stringify(allRecords));
  }, [allRecords]);

  const onSetRecord = (e) => {
    e.preventDefault();
    // console.log(selectedRecordId)
  };
  useEffect(() => {
    if (selectedRecordId)
      history(`/random_record/${selectedRecordId}`, { replace: true });
    else if (selectedRecordId === "")
      history(`/random_record/`, { replace: true });
  }, [JSON.stringify(selectedRecordId)]);

  return (
    <RoutineCom>
      <div className="cont">
        <h1>Random Records Section</h1>
        <form onSubmit={onSetRecord} className="form">
          <Form.Select
            size="md"
            value={selectedRecordId}
            style={{ width: "fit-content" }}
            onChange={(e) => setSelectedRecordId(e.target.value)}
          >
            <option value="">Select a file</option>
            {allRecords.map((i, k) => {
              return (
                <option key={k} value={i.docId}>
                  {i.recordName}
                </option>
              );
            })}
          </Form.Select>
        </form>
        {selectedRecordId && selectedRecordId !== "Select a file" ? (
          <>
            <RandomTable selectedRecordId={selectedRecordId} />
          </>
        ) : (
          <h3 className="sel h-50 w-100 d-flex justify-content-center my-3">
            please select your random record
          </h3>
        )}
      </div>
    </RoutineCom>
  );
};

export default RandomComp;

const RoutineCom = styled.div`
  width: -webkit-fill-available;
  min-height: 100vh;
  padding-top: 2rem;
  background: url(${coverrev});
  background-size: cover;
  background-position: center;
  .cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em 2em;
    margin: auto;
  }
  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em 2em;
    margin: auto;
    margin-bottom: 1rem;
  }
  .sel{
    margin-top: 4rem!important;
    margin-bottom: 1rem!important;
    font-size: xx-large;
    font-variant: small-caps;
    margin: auto;
    font-weight: 400;
    font-family: monospace;
  }
  @media (max-width: 780px) {
    .sel{
      font-size: larger;
    }
    .cont,
    .for {
      padding: 2em 0.5em;
    }
  }
`;
