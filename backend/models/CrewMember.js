const modules = require("../configDB");
const sequelize = modules.sequelize;
const DataTypes = modules.DataTypes;


//Definire celei de-a doua entități - 0.3

//Modelul (Tabelul pentru Crew Member)
const CrewMember = sequelize.define("CrewMember", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 5,
    },
  },
  rol: {
    type: DataTypes.ENUM("DIRECTOR", "WRITER", "PRODUCER"),
    allowNull: false
  }
});

module.exports = CrewMember;
