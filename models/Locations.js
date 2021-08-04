const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("location", {
    locationID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    placeName: DT.STRING,
    imageFileName: DT.STRING,
  });
};
