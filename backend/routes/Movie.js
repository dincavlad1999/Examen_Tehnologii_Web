const express = require("express");
//Import the function responsable for validating(filtering) the movie body 
const validateMovieBody = require("../middleware/validateMovieBody");
//Import router in order to use specific METHODS( GET,POST,UPDATE,DELETE)
const router = express.Router();

//Import Movie Table 
const Movie = require("../models").MovieTable;


//Checks the existance of a movie based on its id 
const verifyMovieExistance = async (id, res) => {
  const movie = await Movie.findByPk(id);
  //If i can't find the meeting tell me 
  if (!movie) {
    return res
      .status(404)
      .json({
        message: `Cannot find the movie with the ${id} id`,
      });
  }
  // Return the meeting if I find it
  return movie;
}

//Operație POST pentru prima entitate - 0.3

//POST a movie, but first I Check the title and the category 
router.post("/", validateMovieBody, async (req, res) => {
  //Build a meeting based on input
  const movie = Movie.build({
    titlu: req.body.titlu,
    categorie: req.body.categorie,
  });


  try {
    //save it into the DB and returns it 
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    //bad request
    res.status(400).json({ message: error.message });
  }
});

// Operație GET pentru prima entitate - 0.3
//Gets all the movies in the DB ( GET )
router.get("/", async (req, res) => {
  try {
    //Get all the movies from the db and display them W
    const movies = await Movie.findAll();
    return res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Sortare după un câmp pentru prima entitate - 0.3
//sort by dataPublicarii ( ASC || DESC)
router.get('/dataPublicarii/:sortType', async (req, res) => {
  try {
    const movies = await Movie.findAll({
      order: [['dataPublicarii', req.params.sortType]]
    });
    return res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


//Paginare pentru prima entitate - 0.3
//PAGINARE
const getPagination = (page, size) => {
  const limit = size ;
  const offset = page * size;
  return { limit, offset };
};

//PAGINARE
router.get('/pagination/:page/:size', async (req, res) => {
  try {
    const { limit, offset } = getPagination(req.params.page, req.params.size);
    const movies  = await Movie.findAndCountAll({limit, offset});
   
    return res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Operație GET pentru prima entitate (bazata pe un anumit parametru din URL) - 0.3
//Get an movie by id 
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res
        .status(404)
        .json({
          message: `Cannot find the movie with the ${req.params.id} id`,
        });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//Operație PUT pentru prima entitate - 0.3 (USED PATCH FOR UPDATING DATA IF PARTIAL DATA IS PROVIDED)
//Update a movie 
router.patch("/:id", validateMovieBody, async (req, res) => {
 let currentMovie =  await verifyMovieExistance(req.params.id, res);

  try {
    currentMovie.set({
      ...currentMovie,
      titlu: req.body.titlu,
      categorie: req.body.categorie,
    });

    const newMovie = await currentMovie.save();
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//Operație DELETE pentru prima entitate - 0.3
//Delete a meeting based on its ID 
router.delete("/:id", async (req, res) => {
  try {
      let currentMovie =  await verifyMovieExistance(req.params.id, res);
      await currentMovie.destroy();
    res.json({ message: "Movie has been deleted " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
