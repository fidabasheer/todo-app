const express = require('express');
const bodyParser = require('body-parser');
const team = require('./team');
const app = express();
const path = require('path'); 



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));


app.get('/', (req, res) => {
  res.send("Hi there");
});


app.use('/api/todo', team);


app.listen(6028, () => {
  console.log("Your server running in port 6028");
});