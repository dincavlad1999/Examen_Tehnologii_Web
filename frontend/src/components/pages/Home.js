/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../movie/MovieCard";
import http from "../../services/http";
import { MovieForm } from "../movie/MovieForm";

const Home = () => {
  //Retin datele cu referire la movies
  const [movies, setMovies] = useState([]);

  // Iau toate movieurile existente de pe server
  let getCurrentProfile = async () => {
    axios.get("/movie").then((res) => setMovies(res.data));
  };

  //Se intampla dupa ce dau render la componenta 
  useEffect(() => {
    getCurrentProfile();
  }, []);

  //Sterg un movie pe baza id-ului si il readaug in movies
  const onMovieDelete = (id) => {
    http.delete(`/movie/${id}`).then((res) => {
      const newArray = movies.filter((movie) => movie.id !== id);
      setMovies([...newArray]);
    });
  };

  //Adaug un movie
  const onMovieAdd = ({ titlu, categorie }) => {
    http
      .post("/movie", { titlu, categorie })
      .then((res) => {
        setMovies([...movies, res.data]);
      })
      .catch((e) => console.error(e));
  };
  return (
    <>
      <div>
        <MovieForm onMovieAdd={onMovieAdd} />{" "}
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              onMovieDelete={onMovieDelete}
              movie={movie}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
