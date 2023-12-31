require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use((req, res, next) => {
  console.log(`method: ${req.method}: ${req.url}`);

  next();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Oussama tailba's application." });
});

require("./app/routes/annonce.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
