let sequelize = require("../configDB.js");
const MovieTable = require("./Movie");
const CrewMemberTable = require("./CrewMember");

//Definirea relației dintre cele două entități - 0.3

//Define the relationships between tables 

MovieTable.hasMany(CrewMemberTable, {
  foreignKey: "movieId",
  onUpdate: "cascade",
});

CrewMemberTable.belongsTo(MovieTable, {
  foreignKey: "movieId",
  onUpdate: "cascade",
});

module.exports = {
  sequelize,
  MovieTable,
  CrewMemberTable
};
