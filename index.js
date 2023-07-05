const express = require('express');
const http = require('http');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;
    const requests = [];
    for (const url of urls) {
      requests.push(http.get(url));
    }
    try {
      const responses = await Promise.all(requests);
      let data = "";
      for (const response of responses) {
        data += response;
      }
      const numbers = JSON.stringify(data);
      res.json(numbers);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });
  
  

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
