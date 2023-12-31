const dbConfig = require("../config/db.confing");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.annonces = require("./annonce.model")(mongoose);
db.users = require("./user.model")(mongoose);

module.exports = db;
