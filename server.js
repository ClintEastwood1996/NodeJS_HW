const http = require("http");
const port = 8080;
const fs = require("fs");
const DATABASE = "db.json";

const requestHandler = (request, response) => {
  const NAMES = JSON.parse(fs.readFileSync(DATABASE, "utf-8"));

  if (request.method === "POST") {
    if (request.headers.iknowyoursecret === "TheOwlAreNotWhatTheySeem") {
      NAMES.unshift({
        name: request.headers.username,
        ip: request.connection.remoteAddress,
      });
      fs.writeFile(DATABASE, JSON.stringify(NAMES), (err) => {
        if (err) {
          throw err;
        }
      });
      console.log(`Hello, ${NAMES[0].name}`);
    } else {
      console.log(`Hold on, you don't know my secret yet.`);
    }
  }

  response.end();
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log("something went wrong", err);
  }

  console.log(`server is listening on ${port}`);
});
