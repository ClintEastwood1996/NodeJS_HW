// POST
const http = require("http");
const port = 8080;

const data = JSON.stringify({
  myString: "My string",
});

const options = {
  hostname: "localhost",
  port: port,
  method: "POST",
  headers: {
    'WhatWillSaveTheWorld': 'Love',
  },
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.write(data);
req.end();
