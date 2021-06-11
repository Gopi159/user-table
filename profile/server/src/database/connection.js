const mongoose = require("mongoose");
const configData = require(`../config/config.${process.env.ENV}.json`);

exports.connection = mongoose.connect(
  configData["DB_PATH"],
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Database Connected Successfully")
);
