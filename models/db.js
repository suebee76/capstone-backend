const Sequelize = require("sequelize");

let dbURL = process.env.DATABASE_URL
if (!dbURL) { 
  dbURL = "postgres://susanbaiter@localhost:5432/capstonebackend"
}


const db = new Sequelize(
  dbURL,
  { dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // very important
      }
  },
    logging: false,
  }
);

// let db;
// if(process.env.DATABASE_URL){
//   db = new Client ({
//     connectionString:process.env.DATABASE_URL,
//     ssl:{
//       rejectUnauthorized: false
//     }
//   });
// } else {
//   db = new Client ({
//     user: process.env.DATABASE_USER,
//     database: process.env.DATABASE_NAME,
//     password: process.env.DATABASE_PASSWORD,
//     host: process.env.DATABASE_HOST
//   })
// }


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
