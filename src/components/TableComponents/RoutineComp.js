import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { coverrev } from "../../assets";
import RoutineTable from "./RoutineTable/RoutineTable";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";

const RoutineComp = () => {
  const history = useNavigate();
  const params = useParams();
  const [allrecords, setAllrecords] = useState(
    JSON.parse(localStorage.getItem("routine-records")) || []
  );
  const [selectedRecordId, setSelectedRecordId] = useState(params.id);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(doc(db, "allRecord", auth.currentUser.uid), "records"),
      (docs) => {
        const rec = [];
        docs.forEach((doc) => {
          if (doc.data().recordType.name === "Routine") {
            rec.push({ ...doc.data(), docId: doc.id });
          }
        });
        setAllrecords(rec);
        if (params) {
          setSelectedRecordId(params.id);
        }
      }
    );
    return unsub;
  }, []);

  useEffect(() => {
    localStorage.setItem("routine-records", JSON.stringify(allrecords));
  }, [allrecords]);

  useEffect(() => {
    if (selectedRecordId)
      history(`/routine_record/${selectedRecordId}`, { replace: true });
    else if (selectedRecordId === "")
      history(`/routine_record/`, { replace: true });
  }, [selectedRecordId]);

  const onSetRecord = (e) => {
    e.preventDefault();
    // console.log(selectedRecordId)
  };

  return (
    <RoutineCom>
      <div className="cont">
        <h1>Routine Record Section</h1>
        <form onSubmit={onSetRecord} className="form">
          <Form.Select
            size="md"
            value={selectedRecordId}
            style={{ width: "fit-content" }}
            onChange={(e) => {
              setSelectedRecordId(e.target.value);
            }}
          >
            <option value="">Select a file</option>
            {allrecords.map((i, k) => {
              return (
                <option key={k} value={i.docId}>
                  {i.recordName}
                </option>
              );
            })}
          </Form.Select>
          {/* <button
            type="submit"
            className="btn btn-primary btn-md-md btn-lg-lg my-auto up mx-2"
          >
            Load
          </button> */}
        </form>
        {selectedRecordId && selectedRecordId !== "Select a file" ? (
          <>
            <RoutineTable selectedRecordId={selectedRecordId} />
          </>
        ) : (
          <h3 className="sel h-50 w-100 d-flex justify-content-center my-3">
            please select your routine record
          </h3>
        )}
      </div>
    </RoutineCom>
  );
};

export default RoutineComp;

const RoutineCom = styled.div`
  width: -webkit-fill-available;
  padding-top: 2rem;
  min-height: 100vh;
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
    .cont,
    .for {
      padding: 2em 0.5em;
    }
    .sel{
      font-size: larger;
    }
  }
  
`;
