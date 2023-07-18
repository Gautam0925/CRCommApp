const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;

app.use("/userProfilePhotos", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userProfileRoutes = require("./routes/userProfile");

const conn = mongoose
  .connect(
    "mongodb+srv://CRCommAppDBUser:ODivS3tQpTuV1XC1@cluster0.3xeyy4o.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("DB is connected");
  });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/userProfile", userProfileRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(8000, () => {
  console.log("App is listening on port 8000");
});

module.exports = app;
