const bodyParser = require("body-parser");
let express = require("express");
let app = express();
app.use(express.json());
app.use(bodyParser.json());
const users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];
let atleastOneUnhealthyKidney = false;
const isThereisAtleastOneUnhealthyKidney = () => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atleastOneUnhealthyKidney = true;
    }
  }
  return atleastOneUnhealthyKidney;
};

// GET
app.get("/", (req, res) => {
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = users[0].kidneys.length;
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < numberOfKidneys; i++) {
    if (johnKidneys[i].healthy) {
      numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
    }
  }
  let numberOfUnealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  res.json({
    johnKidneys,
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnealthyKidneys,
  });
});
//POST
app.post("/", (req, res) => {
  const healthy = req.body.healthy;
  users[0].kidneys.push({
    healthy: healthy,
  });
  res.json(users);
});

//PUT
app.put("/", (req, res) => {
  const numberOfKidneys = users[0].kidneys.length;
  const healthy = req.body.healthy;
  for (let i = 0; i < numberOfKidneys; i++) {
    users[0].kidneys[i].healthy = healthy;
  }
  res.json(users);
});
//Delete
app.delete("/", (req, res) => {
  try {
    const newKidneys = [];
    const numberOfKidneys = users[0].kidneys.length;
    if (isThereisAtleastOneUnhealthyKidney()) {
      for (let i = 0; i < numberOfKidneys; i++) {
        if (users[0].kidneys[i].healthy) {
          newKidneys.push({
            healthy: true,
          });
        }
      }
      users[0].kidneys = newKidneys;
      res.json("Deleted");
    } else {
      res.status(404).json({ msg: "no unhealthy kidney" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(5000);
