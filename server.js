const server = require("express")();
server.use(require("body-parser").json());
server.use(require("cors")());

let port = process.env.PORT;
if (!port) {
  port = 3001;
}

const { db, Locations, Festivals } = require("./models/db.js");
const { Op } = require("sequelize");

server.get("/", (req, res) => {
  res.send("hello world");
});

server.get("/loadDummyData", async (req, res) => {
  const newLocation = await Locations.create({
    placeName: "hotel syracuse",
    imageFileName: "./img2.png",
  });

  await Festivals.create({
    locationID: newLocation.locationID,
    title: "Ball",
    paragraph: "Test para",
    url: "fair.com",
    image: "img2.png",
  });

  res.send({ created: true });
});

server.get("/locations", async (req, res) => {
  res.send({
    locations: await Locations.findAll({ include: [{ model: Festivals }] }),
  });
});

server.get("/locations/:placeName", async (req, res) => {
  res.send({
    locations: await Locations.findAll({
      where: { placeName: { [Op.iLike]: `%${req.params.placeName}%` } },
      include: [{ model: Festivals }],
    }),
  });
});

server.get("/festivals", async (req, res) => {
  res.send({
    festivals: await Festivals.findAll({ include: [{ model: Locations }] }),
  });
});

server.post("/locations", async (req, res) => {
  await Locations.create(req.body);
  res.send({ locations: await Locations.findAll() });
});

server.post("/festivals", async (req, res) => {
  await Festivals.create(req.body);
  res.send({ festivals: await Festivals.findAll() });
});

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
