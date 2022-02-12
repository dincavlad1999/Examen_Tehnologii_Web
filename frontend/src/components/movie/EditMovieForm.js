import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const EditMovieForm = ({ movie,onMovieEdit }) => {
  const [formData, setFormData] = useState({
    titlu: movie.titlu,
    categorie: movie.categorie,
  });

  const { titlu, categorie } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    onMovieEdit(formData);
    console.log("submit");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
          <h3>Edit the movie with the id: {movie.id}</h3>
        <Form.Label>Titlu:</Form.Label>
        <Form.Control
          value={titlu}
          onChange={onChange}
          type="text"
          name="titlu"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Categorie:</Form.Label>
        <Form.Control value={categorie} onChange={onChange} type="text" name="categorie" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
