import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { EditMovieForm } from "./EditMovieForm";
import http from '../../services/http'

function MovieCard({ movie , onMovieDelete}) {
  const [currentMovie, setCurrentMovie] = useState(movie);
  const [isEditMode, setIsEditMode] = useState(false);

  const onMovieEdit = (movie) => {
    http.patch(`/movie/${currentMovie.id}`, movie).then(res => {
      setCurrentMovie(res.data);
      setIsEditMode(false)
      console.log(res.data)
    })
  }



  return (
    <Fragment>
      {isEditMode ? (
       <EditMovieForm movie={movie} onMovieEdit={onMovieEdit} />
      ) : (
        <div
          style={{ border: "1px solid green", margin: "10px", padding: "16px" , display: 'flex', flexDirection: 'column'}}
        >
          <h2>The Movie with the id: {currentMovie.id}</h2>
          <p>Titlu: {currentMovie.titlu}</p>
          <p>Categorie: {currentMovie.categorie}</p>
         Data publicarii: <p>{currentMovie.dataPublicarii.split("T")[0]}</p>
          <Button onClick={() => setIsEditMode(true)}>Edit</Button>{" "}
          <Button variant="danger" onClick={() => onMovieDelete(currentMovie.id)}>Delete</Button>
        </div>
      )}
    </Fragment>
  );
}

export default MovieCard;
