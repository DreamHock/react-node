const db = require("../models");
const Annonce = db.annonces;

// Create and Save a new annonce
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a annonce
  const annonce = new Annonce({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
  });

  // Save annonce in the database
  annonce
    .save(annonce)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the annonce.",
      });
    });
};

// Retrieve all annonces from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Annonce.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving annonces.",
      });
    });
};

// Find a single annonce with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Annonce.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found annonce with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving annonce with id=" + id });
    });
};

// Update a annonce by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Annonce.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update annonce with id=${id}. Maybe annonce was not found!`,
        });
      } else res.send({ message: "annonce was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating annonce with id=" + id,
      });
    });
};

// Delete a annonce with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Annonce.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete annonce with id=${id}. Maybe annonce was not found!`,
        });
      } else {
        res.send({
          message: "annonce was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete annonce with id=" + id,
      });
    });
};

// Delete all annonces from the database.
exports.deleteAll = (req, res) => {
  Annonce.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} annonces were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all annonces.",
      });
    });
};

// Find all image annonces
// exports.findAllimage = (req, res) => {
//   annonce.find({ image: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving annonces.",
//       });
//     });
// };
