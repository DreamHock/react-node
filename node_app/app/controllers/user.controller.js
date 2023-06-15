const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

// Create and Save a new Tutorial
exports.rejester = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Find a single Tutorial with an id
exports.logIn = async (req, res) => {
  const user = req.body;

  const foundUser = await User.findOne({ email: user.email });

  if (!foundUser) res.status(401).send({ message: "email not found" });

  const verifyPassword = await bcrypt.compare(
    user.password,
    foundUser.password
  );

  if (!verifyPassword) res.state(403).json({ message: "password incorrect" });

  const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  console.log(token)

  return res.json(token);

  // catch((err) {
  //   res
  //     .status(500)
  //     .send({ message: "Error retrieving Tutorial with id=" + id });
};

exports.getUsers = async (req, res) => {
  const allUsers = await User.find();
  return res.json({ allUsers: allUsers });
};
