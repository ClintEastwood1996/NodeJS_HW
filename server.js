const port = 8080;
const { request } = require("express");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connecting with mongoDB
mongoose.connect("mongodb://localhost:27017");
const UserSchema = mongoose.Schema({name: String, ip: String});
const User = mongoose.model("Users", UserSchema);

// Checking the request
app.use((request, response, next) => {
  if (request.method !== "POST") {
    console.log("I see you are using wrong method");
    response.end();
  } else {
    console.log("I see you are using right method");
    next();
  }
});

// Checking the secret header
app.post("/", (request, response, next) => {
  if (request.headers.iknowyoursecret === "TheOwlAreNotWhatTheySeem") {
    console.log("I'm glad you know my secret");
    next();
  } else {
    console.log("Hold on, you don't know my secret yet.");
    response.end();
  }
});

app.post("/", (request, response, next) => {
  const NAME = request.headers.username ? request.headers.username : "stranger";
  const IP = request.connection.remoteAddress;

  // Save new user in MongoDb
  const user = new User({name: NAME, ip: IP});
  user.save((error, savedUser) => {
    if (error) {
      throw error;
    }
    console.log(`You've been added to our database. Your name is ${savedUser.name}, your ip is ${savedUser.ip}`);
  });


  response.end();
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
  User.find({}, (err, users) => {
    console.log(
      "In the collection at the moment:",
      users.map((u) => u.name).join(" ")
    );
  });
});
