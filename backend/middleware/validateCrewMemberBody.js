  
  let valoriPosibile = ["DIRECTOR", "WRITER", "PRODUCER"];

  //Filtrare după două câmpuri pentru prima entitate - 0.3
  
  module.exports = function (req, res, next) {
    //If the body of the description is empty and or its length is than 3 
    if (!req.body.nume || req.body.nume.length < 5) {
      return res
        .status(400)
        .json({
          message: "Nume is missing or should be longer than 5 characters",
        });
    }
    //Daca categoria nu este una dintre cele speicifcate
    if(!valoriPosibile.includes(req.body.rol.toUpperCase()))
    {
      return res
      .status(400)
      .json({
        message: "This crew member rol is not available.",
      });
    }
  
    //Go to the next middleware 
    next();
  };
  