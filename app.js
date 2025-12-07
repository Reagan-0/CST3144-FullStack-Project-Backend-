var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();

var app = express();
var port = process.env.PORT || 3000;

var uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set');
  process.exit(1);
}

var client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

var db;
var lessonsCollection;
var ordersCollection;

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(process.env.DB_NAME || 'lessonsdb');
    lessonsCollection = db.collection('lesson');
    ordersCollection = db.collection('order');
    console.log('Collections ready');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('json spaces', 3);

app.use((req, res, next) => {
  console.log("In comes a request to: " + req.url);
  next();
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

