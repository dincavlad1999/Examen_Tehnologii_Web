import React, { useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import http from '../../services/http';

export const EditParticipantForm = ({ participant,onParticipantEdit }) => {
  const [formData, setFormData] = useState({
    nume: participant.name,
    rol: participant.rol,
    movieId: participant.movieId,
  });

  const { nume,rol, movieId } = formData;

  const [movies, setMovies] = useState([]);
  let getMovies = async () => {
    http.get("/movie").then((res) => setMovies(res.data));
  };

  useEffect(() => {
    getMovies();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    onParticipantEdit(formData);
    console.log("submit");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
          <h3>Edit the participant with the id: {participant.id}</h3>
        <Form.Label>Nume:</Form.Label>
        <Form.Control
          value={nume}
          onChange={onChange}
          type="text"
          name="nume"
        />

        <Form.Label>Rol:</Form.Label>
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
        value={movieId}
        onChange={(e) =>
          setFormData({ ...formData, movieId: e.target.value })
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
