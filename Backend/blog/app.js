var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const blogRouter = require("./routes/blog");

const { setCors } = require("./middleware/security");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

var app = express();

const adapter = new FileSync("data/db.json");
const db = low(adapter);
//add default entries to the DATABASE
db.defaults({
  posts: [],
}).write();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/blog", blogRouter);

app.use((err, req, res, next) => {
  //respond to the requestor with the error messages
  //set response status to 500
  console.log(err);
  res.status(500).send({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
