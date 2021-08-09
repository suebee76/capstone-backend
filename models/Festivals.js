const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("festival", {
    festivalID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    locationID: DT.INTEGER,
    title: DT.STRING,
    paragraph: DT.TEXT,
    date: DT.STRING,
    buttonURL: DT.STRING,
    buttonText: DT.STRING,
    image: DT.STRING,
  });
};
