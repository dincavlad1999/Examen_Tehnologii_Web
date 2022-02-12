const express = require("express");
const validateCrewMemberBody = require("../middleware/validateCrewMemberBody");
const router = express.Router();
const CrewMember = require("../models").CrewMemberTable;


// Operație POST pentru a doua entitate ca subresursă - 0.3
//POST
router.post("/",validateCrewMemberBody, async (req, res) => {
  const crewMember = CrewMember.build({
    nume: req.body.nume,
    rol: req.body.rol,
    movieId: req.body.movieId
  });

  try {
    // save the member into the database
    const newCrewMember = await crewMember.save();
    //created
    return res.status(201).json(newCrewMember);
  } catch (error) {
    //bad request
    res.status(400).json({ message: error.message });
  }
});

//Operație GET pentru a doua entitate ca subresursă - 0.3
//GET ALL crew members
router.get("/", async (req, res) => {
  try {
    const CrewMembers = await CrewMember.findAll();
    return res.status(200).json(CrewMembers);
  } catch (error) {
    //internal server error
    res.status(500).json({ message: error.message });
  }
});

//Operație GET pentru a doua entitate ca subresursă(bazata pe un parametru din URL) - 0.3
//GET crew member BY ID 
router.get("/:id", async (req, res) => {
  try {
    const crewMember = await CrewMember.findByPk(req.params.id);
    if (!crewMember) {
      return res.status(404).json({ message: "Cannot find crew member" });
    }
    res.status(200).json(crewMember);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//Operație PUT pentru a doua entitate ca subresursă - 0.3
//UPDATE crew Member 
router.patch("/:id",validateCrewMemberBody, async (req, res) => {
  try {
    const currentCrewMember = await CrewMember.findByPk(req.params.id);
    if (!currentCrewMember) {
      return res.status(404).json({ message: "Cannot find crew member" });
    }

    currentCrewMember.set({
      ...currentCrewMember,
      nume: req.body.nume,
      rol: req.body.rol,
      movieId: req.body.movieId,
    });

    const newCrewMember = await currentCrewMember.save();
    return res.status(200).json(newCrewMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//Operație DELETE pentru a doua entitate ca subresursă - 0.3
//DELETE a crew member
router.delete("/:id", async (req, res) => {
  try {
    const currentCrewMember = await CrewMember.findByPk(req.params.id);
    if (!currentCrewMember) {
      return res.status(404).json({ message: "Cannot find crew member" });
    }
    await currentCrewMember.destroy();
    return res.json({ message: "Crew member deleted " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
