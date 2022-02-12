  
  let valoriPosibile = ["COMEDIE", "DRAMA", "TRAGEDIE", "ROMANTIC", "AVENTURA","HORROR"];

  //Filtrare după două câmpuri pentru prima entitate - 0.3
  
  module.exports = function (req, res, next) {
    //If the body of the description is empty and or its length is than 3 
    if (!req.body.titlu || req.body.titlu.length < 3) {
      return res
        .status(400)
        .json({
          message: "Title is missing or should be longer than 3 characters",
        });
    }
    //Daca categoria nu este una dintre cele speicifcate
    if(!valoriPosibile.includes(req.body.categorie.toUpperCase()))
    {
      return res
      .status(400)
      .json({
        message: "This movie category is not available.",
      });
    }
  
    //Go to the next middleware 
    next();
  };
  