import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { EditParticipantForm } from "./EditParticipantForm";
import http from "../../services/http";
import { Link } from "react-router-dom";

function ParticipantCard({ participant, onParticipantDelete }) {
  const [currentParticipant, setCurrentParticipant] = useState(participant);
  const [isEditMode, setIsEditMode] = useState(false);

  const onParticipantEdit = (participant) => {
    http
      .patch(`/crewMember/${currentParticipant.id}`, participant)
      .then((res) => {
        setCurrentParticipant({
          ...currentParticipant,
          nume: res.data.nume,
          movieId: res.data.movieId,
        });
        setIsEditMode(false);
        console.log(res.data);
      });
  };

  return (
    <Fragment>
      {isEditMode ? (
        <EditParticipantForm
          participant={participant}
          onParticipantEdit={onParticipantEdit}
        />
      ) : (
        <div
          style={{
            border: "1px solid green",
            margin: "10px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4>
            The participant with the name:{" "}
            <span style={{ color: "purple" }}>{currentParticipant.nume},{currentParticipant.rol}</span>{" "}
            takes part in the movie with the id :{" "}
            <span style={{ color: "purple" }}>
              {currentParticipant.movieId}
            </span>
          </h4>
          <Button onClick={() => setIsEditMode(true)}>Edit</Button>{" "}
          <Button
            variant="danger"
            onClick={() => onParticipantDelete(currentParticipant.id)}
          >
            Delete
          </Button>
          <Link to={`/participants/${currentParticipant.id}`}>See more</Link>
        </div>
      )}
    </Fragment>
  );
}

export default ParticipantCard;
