//  create express server
const express = require('express');

const app = express();
const port = 5001;


app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index');
  });

app.use(express.static('server/server'));


app.listen(port,  () => {
    console.log(`server is running on port http://localhost:${port}`);
    });