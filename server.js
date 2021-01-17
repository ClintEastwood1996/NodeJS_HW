const port = 8080;
const fs = require("fs");
const DATABASE = "db.json";
const express = require("express");

const app = express();

const NAMES = JSON.parse(fs.readFileSync(DATABASE, "utf-8"));

app.use((request, response, next) => {
  if (request.method !== "POST") {
    console.log("I see you are using wrong method");
    response.end();
  } else {
    console.log("I see you are using right method");
    next();
  }
});

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

  console.log(`You've been added to our database. Your name is ${NAME}, your ip is ${IP}`);

  NAMES.unshift({
    name: NAME,
    ip: IP,
  });

  fs.writeFile(DATABASE, JSON.stringify(NAMES), (err) => {
    if (err) {
      throw err;
    }
  });

  response.end();
});

app.listen(port, console.log(`Server is listening at port ${port}`));
