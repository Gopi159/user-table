const express = require("express");
var cors = require("cors");
require("dotenv/config");
require("mongoose");
const userRoute = require("./src/api/user");
require("./src/database");
const app = express();
const port = process.env.PORT;
const router = express.Router();

//Parsing data from Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import Routes
app.use(cors());
app.use("/api", userRoute(router));

app.all("**", (req, res) => {
  res.status(404).json({
    message: "Invalid Route",
    status: 404,
  });
});

//Server Listening
app.listen(port, () => {
  console.log("Server Started Successfully at Port :", port);
});
