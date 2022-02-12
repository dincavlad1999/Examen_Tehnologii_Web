//Import express
const express = require("express");

//Helps me to cross browser accesibility constraints 
const cors = require("cors");

//Start the express aplication
const app = express();
//Use cors library 
app.use(cors());

//Require the sequelize library
const sequelize = require("./configDB");

//Use JSON in app 
app.use(express.json());

//Router for handling different meeting routes
const movieRoutes = require("./routes/Movie");
app.use("/movie", movieRoutes);

//Routes for handling different participant routes
const CrewMemberRoutes = require("./routes/CrewMember");
app.use("/crewMember", CrewMemberRoutes);

//Start the app at 3000 port 
app.listen(4050, () =>
  console.log("Server has started at " + "http://localhost:4050")
);
