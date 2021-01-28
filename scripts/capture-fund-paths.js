const https = require('https');
const fs = require('fs');
const baseURL = 'https://385-j-cu-giving.pantheonsite.io';

// Capture Fund paths.
https.get(`${baseURL}/api/funds/paths`, (res) => {
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (data) => {
    body += data;
  });
  res.on('end', () => {
    fs.writeFile('./data/fund-paths.json', body, (err) => {
      if (err) console.log(err);
      else {
        console.log('File written successfully\n');
        console.log('The written has the following contents:');
        console.log(fs.readFileSync('./data/fund-paths.json', 'utf8'));
      }
    });
  });
});
