// Week 6b Project - Backend
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var app = express();
var port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('json spaces', 3);

// Week 6b Routing pt2/index.js pattern - logger middleware
app.use((req, res, next) => {
  console.log("In comes a request to: " + req.url);
  next();
});

// Week 6b Routing pt2/index.js pattern - start server
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

