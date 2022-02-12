const modules = require("../configDB");
const sequelize = modules.sequelize;
const DataTypes = modules.DataTypes;

//Definirea primei entități - 0.3

//Modelul (Tabelul pentru Movie)
const Movie = sequelize.define("Movie", {
  //Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titlu: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 3,
    },
  },
  categorie: {
    type: DataTypes.ENUM("COMEDIE", "DRAMA", "TRAGEDIE", "ROMANTIC", "AVENTURA","HORROR"),
    allowNull: false,
  },
  dataPublicarii: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Movie;
