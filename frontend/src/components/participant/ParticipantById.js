import React, { Fragment, useState, useEffect } from "react";
import http from "../../services/http";
import { useParams } from "react-router-dom";

function ParticipantById() {
  const [currentParticipant, setCurrentParticipant] = useState();
  const { id } = useParams();
  useEffect(() => {
    http.get(`/crewMember/${id}`).then((res) => {
      setCurrentParticipant(res.data);
    });
  }, []);
  return (
    <Fragment>
      {currentParticipant && (
        <>
          <div
            style={{
              border: "1px solid green",
              margin: "10px",
              padding: "16px",
            }}
          >
            <h4>
              The participant with the name:{" "}
              <span style={{ color: "purple" }}>{currentParticipant.nume},{currentParticipant.rol}</span>{" "}
              takes part in the Movie with the id :{" "}
              <span style={{ color: "purple" }}>
                {currentParticipant.movieId}
              </span>
            </h4>
          </div>
        </>
      )}
    </Fragment>
  );
}

export default ParticipantById;
