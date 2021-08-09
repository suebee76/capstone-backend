const Sequelize = require("sequelize");

let dbURL = process.env.DATABASE_URL;
if (!dbURL) {
  dbURL = "postgres://susanbaiter@localhost:5432/capstonebackend";
}

const db = new Sequelize(dbURL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false, // very important
    // }
  },
  logging: false,
});

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
  await db.sync({ force: true }); //{ force: true }

  const festivals = await Festivals.findAll();
  if (festivals.length === 0) {
    const newLocation = await Locations.create({
      placeName: "Central NY",
      imageFileName: "./onondagacountymap.jpg",
    });

    await Locations.create({
      placeName: "Western NY",
      imageFileName: "./westernny.jpg",
    });

    await Locations.create({
      placeName: "Capital District",
      imageFileName: "./capitaldistrictmap.jpg",
    });

    await Locations.create({
      placeName: "Finger Lakes",
      imageFileName: "./fingerlakesmap.jpg",
    });

    await Locations.create({
      placeName: "Hudson Valley",
      imageFileName: "./hudsonvalleymap.jpg",
    });

    await Locations.create({
      placeName: "Long Island",
      imageFileName: "./longislandmap.jpg",
    });

    await Locations.create({
      placeName: "Mohawk Valley",
      imageFileName: "./mohawkvalleysheetmusic.jpg",
    });

    await Locations.create({
      placeName: "North Country",
      imageFileName: "./northcountrymap.jpg",
    });

    await Locations.create({
      placeName: "New York City",
      imageFileName: "./1863nycmap.jpg",
    });

    await Locations.create({
      placeName: "Southern Tier",
      imageFileName: "./southerntiermap.jpg",
    });

    await Festivals.create({
      locationID: newLocation.locationID,
      title: "New York State Blues Fest",
      date: "June 24-25-26, 2021",
      paragraph:
        "The New York State Blues Festival is one of the largest FREE blues events in the Northeast. This annual 3 day musical celebration, showcases a collection of regional and national artists from multiple genres, all with roots steeped in tradition and vision, and arranges them for a continuous river of music. The mission of the NYS Blues Festival is to preserve, protect and promote blues music and culture. ",
      buttonURL: "https://www.nysbluesfest.com/",
      buttonText: "NYS Blues Festival",
      image: "backend-images/nysbluesfest.jpeg",
    });

    await Festivals.create({
      locationID: newLocation.locationID,
      title: "Adirondack Independence Music Festival",
      date: "September 3-4-5, 2021",
      paragraph:
        "This three day, multi-band event will feature several of the premiere touring bands currently on the festival circuit. Located at the beautiful Charles R. Wood Festival Commons in the heart of Lake George, NY, the festival prides itself on high-quality production and an amazing atmosphere that is suitable for all ages.",
      buttonURL: "https://adkmusicfest.com/",
      buttonText: "ADK Music Festival",
      image: "backend-images/ADK2021.jpeg",
    });

    await Festivals.create({
      locationID: newLocation.locationID,
      title: "Grassroots Festival of Music & Dance",
      date: "July 21-22-23-24, 2022",
      paragraph:
        "We’re excited to be celebrating the 30th Annual GrassRoots Festival of Music & Dance, hosted by founding band Donna the Buffalo. 4 days, 4 stages, 70 bands. Music, dancing, art, camping, workshops, healing arts, yoga, family fun, and more!",
      buttonURL: "https://www.grassrootsfest.org/",
      buttonText: "Grassroots Festival",
      image: "backend-images/grassroots.jpeg",
    });

    await Festivals.create({
      locationID: newLocation.locationID,
      title: "Catskill Mountain Jubilee",
      date: "August 12-13-14, 2021",
      paragraph:
        "The debut Catskill Mountain Jubilee takes place August 12th through 14th, 2021 at upstate New York’s Blackthorne Resort in East Durham New York. The festival will be home to over 25 musical acts whose style range from Reggae, Grateful Dead, rock & roll, Bluegrass & Funk.",
      buttonURL: "https://catskillmountainjubilee.com/",
      buttonText: "Catskill Mountain Jubilee",
      image: "backend-images/catskilljubilee.png",
    });

    await Festivals.create({
      locationID: newLocation.locationID,
      title: "Borderland",
      date: "September 18-19, 2021",
      paragraph:
        "The Borderland Music + Arts Festival celebrates the rich history and renaissance of the region with a two-day music and cultural festival set in one of the most scenic and storied grounds in all of New York State, Knox Farm State Park.",
      buttonURL: "https://borderlandfestival.com/",
      buttonText: "Borderland",
      image: "backend-images/borderland2021.jpeg",
    });

    await Festivals.create({
      locationID: newLocation.locationID,
      title: "Electric Zoo",
      date: "September 3-4-5, 2021",
      paragraph:
        "Established in 2009 by Made Event, the internationally renowned Electric Zoo Festival is one of New York City’s largest music festivals and features the top names in electronic music, bringing a wide variety of acts from around the world and across the spectrum of electronic music’s various sub-genres.",
      buttonURL: "https://electriczoo.com/",
      buttonText: "Electric Zoo",
      image: "backend-images/electriczoo.png",
    });

    await Festivals.create({
      locationID: newLocation.locationID,
      title: "The Governors Ball",
      date: "September 24-25-26, 2021",
      paragraph:
        "Music. Art. Food. Experiences. Community. Surprises. NEW. YORK. CITY.The Gov Ball experience encompasses all of these and is unlike any other festival out there. Built by New Yorkers, for New Yorkers, the festival is always evolving, always entertaining, and always striving to exceed your expectations.",
      buttonURL: "https://www.governorsballmusicfestival.com/",
      buttonText: "The Governors Ball",
      image: "backend-images/governorsball.jpeg",
    });

    await Festivals.create({
      locationID: newLocation.locationID,
      title: "Great South Bay Music Festival",
      date: "July 7-8-9-10, 2022",
      paragraph:
        "Celebrating its 14th Anniversary, The Great South Bay Music Festival is Long Island’s longest running, and largest four day music, art & cultural. Situated on the magnificent Great South Bay, it features approximately 60 performers on 4 stages, presenting legends, as well as local emerging artists in classic rock, jazz, jam-band, country, folk, zydeco, hip hop and funk.",
      buttonURL: "https://www.greatsouthbaymusicfestival.com/",
      buttonText: "GSB Music Festival",
      image: "backend-images/GSB.png",
    });

    await Festivals.create({
      locationID: newLocation.locationID,
      title: "Woodsist Festival",
      date: "September 25-26, 2021",
      paragraph:
        "Woodsist is proud to announce an expanded 2021 edition of the WOODSIST FESTIVAL, returning to Arrowood Farms in Accord, NY on September 25 and 26. After the success of the 2019 festival, we’re stretching to include more…. More music, more food, more space, more of everything.",
      buttonURL: "https://www.woodsistfestival.com/",
      buttonText: "Woodsist Festival",
      image: "backend-images/Woodsist-Festival.jpeg",
    });
  }
};

connectToDB();

module.exports = { db, Locations, Festivals };
