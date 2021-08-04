const Sequelize = require("sequelize");

const db = new Sequelize(
  `postgres://susanbaiter@localhost:5432/capstonebackend`,
  {
    logging: false,
  }
);

const Locations = require("./Locations.js")(db);
const Festivals = require("./Festivals.js")(db);

const connectToDB = async () => {
  await db.authenticate();
  console.log("DB connect success!");
  Festivals.belongsTo(Locations, { foreignKey: "locationID" });
  Locations.hasMany(Festivals, { foreignKey: "locationID" });
  db.sync(); //{ force: true }
};

connectToDB();

module.exports = { db, Locations, Festivals };
