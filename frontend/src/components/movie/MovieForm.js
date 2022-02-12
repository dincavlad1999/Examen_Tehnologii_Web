import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const MovieForm = ({ onMovieAdd }) => {
  const [formData, setFormData] = useState({
    titlu: '',
    categorie: '',
  });

  const { titlu, categorie } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    onMovieAdd({...formData});
    console.log("submit");
  };

  return (
    <Form onSubmit={onSubmit}>
        <h3>Add a new movie</h3>
      <Form.Group className="mb-3">
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
