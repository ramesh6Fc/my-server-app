const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.conf");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var corsOptions = {
//   origin: "http://localhost:3000"
// };
//app.use(cors(corsOptions)); // For specific route
app.use(cors())
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

const db = {};
db.mongoose = mongoose;
db.user = require('./models/user-model');
module.exports = db;

// simple route
require('./routes/user-routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB server.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
