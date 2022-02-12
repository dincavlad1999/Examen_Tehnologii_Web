import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import http from "../../services/http";

export const ParticipantForm = ({ onParticipantAdd }) => {
  const [formData, setFormData] = useState({
    nume: "",
    rol: "",
    movieId: "",
  });

  const [movies, setMovies] = useState([]);
  let getMovies = async () => {
    http.get("/movie").then((res) => setMovies(res.data));
  };

  useEffect(() => {
    getMovies();
  }, []);

  const { nume, rol, movieId } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const obj = { ...formData };
    if (!obj.movieId) {
      obj.movieId = movies[0].id;
    }
    onParticipantAdd({ ...obj });
    console.log("submit");
  };

  return (
    <Form onSubmit={onSubmit}>
      <h3>Add a new Crew Member</h3>
      <Form.Group className="mb-3">
        <Form.Label>Nume:</Form.Label>
        <Form.Control
          value={nume}
          onChange={onChange}
          type="text"
          name="nume"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rol (PRODUCER, WRITER, DIRECTOR):</Form.Label>
        <Form.Control
          value={rol}
          onChange={onChange}
          type="text"
          name="rol"
        />
      </Form.Group>


      <Form.Label>Movie</Form.Label>
      <Form.Select
        className="mb-3"
        onChange={(e) =>
          setFormData({ ...formData, meetingId: e.target.value })
        }
        aria-label="Default select example"
      >
        {movies.map((movie) => (
          <option value={movie.id}>{movie.titlu}</option>
        ))}
      </Form.Select>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
