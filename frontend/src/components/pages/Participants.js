/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ParticipantCard from "../participant/ParticipantCard";
import http from "../../services/http";
import { ParticipantForm } from "../participant/ParticipantForm";

const Participant = () => {
  //Store participant data 
  const [participants, setParticipants] = useState([]);

  //Get all participant in the DB 
  let getParticipants = async () => {
    axios.get("/crewMember").then((res) => setParticipants(res.data));
  };

  useEffect(() => {
    getParticipants();
  }, []);


  //DELETE A PARTICIPANT 
  const onParticipantDelete = (id) => {
    http.delete(`/crewMember/${id}`).then((res) => {
      const newArray = participants.filter((participant) => participant.id !== id);
      setParticipants([...newArray]);
    });
  };

  //ADD A PARTICIPANT 
  const onParticipantAdd = ({ nume, rol, movieId }) => {
    http
      .post("/crewMember", { nume, rol, movieId })
      .then((res) => {
        setParticipants([...participants, res.data]);
      })
      .catch((e) => console.error(e));
  };
  return (
    <>
      <div>
        <ParticipantForm onParticipantAdd={onParticipantAdd} />{" "}
        {participants.length > 0 &&
          participants.map((participant) => (
            <ParticipantCard
              key={participant.id}
              onParticipantDelete={onParticipantDelete}
              participant={participant}
            />
          ))}
      </div>
    </>
  );
};

export default Participant;
