// POST
const http = require('http');

const options = {
    hostname: 'localhost',
    port: 8080,
    method: 'POST',
    headers: {
        'username': "ClintEastwood",
        'iknowyoursecret': 'TheOwlAreNotWhatTheySeem'
    }
}

const req = http.request(options);

req.on('error', error => {
    console.error(error)
});

req.end();