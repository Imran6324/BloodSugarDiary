import Masonry from "react-masonry-css";
import styled from "styled-components";
import { Card, Col, Container } from "react-bootstrap";
import { cover1 } from "../../assets";
import { Link } from "react-router-dom";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
const FeaturesCard = ({features}) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  const [userName, setuserName] = useState("");
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "user"), where("uId", "==", auth.currentUser.uid)),
      (docs) => {
        docs.forEach((doc) => {
          setuserName(doc.data().firstName + " " + doc.data().lastName);
        });
      }
    );
    return unsub;
  }, []);
  return (
    <Com>
      <Container
        className="conatiner"
        data-masonry='{"percentPosition": true }'
      >
        <h1 className="ts">Welcome {userName}</h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {features.map((i, idx) => (
            <Col key={idx} className="card-pad">
              <Link to={`${i.link}`}>
                <Card className="Card" style={{ cursor: "pointer" }}>
                  <Card.Img
                    variant="top"
                    src={i.cover}
                    className="bg-image hover-zoom"
                  />
                  <Card.Body>
                    <Card.Title>{i.title}</Card.Title>
                    <Card.Text className="cText" >{i.disc}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Masonry>
      </Container>
    </Com>
  );
};

export default FeaturesCard;
const Com = styled.div`
  width: -webkit-fill-available;
  padding: 30px;
  background: url(${cover1});
  background-size: auto;
  background-repeat: no-repeat;
  @media (max-width: 940px) {
    padding: 5px 0px;
  }
  @media (max-width: 450px) {
    .card-pad {
      padding: 0em 1em !important;
    }
  }
  .cText{
  color:#6c757d !important;
  }
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 25px; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column > div {
    /* change div to reference your elements you put in <Masonry> */
    /* background: #0000000; */
    margin-bottom: 25px;
  }
  h1 {
    font-weight: 600;
    font-size: 3em;
    padding: 10px;
    padding-bottom: 25px;
    font-weight: 600;
    letter-spacing: 10px;
    color: #ffffff;
    font-variant-caps: petite-caps;
    border: 2px solid;
    margin: 5px auto;
    margin-bottom: 40px;
  }
  /* .Card{
    width: 13rem;
  } */
  .my-masonry-grid_column {
    width: 30% !important;
  }
  .my-masonry-grid {
    justify-content: center;
  }

  a {
    text-decoration: none;
    color: black;
  }
  .ts {
    text-shadow: 0px 0px 9px #0000007d;
    border-radius: 15px;
  }
  .ts:hover {
    transition: 0.8s;
    transform: scale(0.95);
    cursor: pointer;
  }
  .Card:hover {
    transition: 0.8s;
    box-shadow: 0px 0px 20px 7px #3273b5;
    transform: scale(1.02);
  }
  .t {
    transition: 0.5;
    text-align-last: justify;
  }
  .bg-image {
    /* height: 12rem; */
  }
  @media screen and (max-width: 960px) {
    h1 {
      font-size: 2em;
      letter-spacing: 5px;
    }
    .my-masonry-grid_column {
      width: 100% !important;
    }
    .my-masonry-grid {
      justify-content: unset;
    }
  }
`;
