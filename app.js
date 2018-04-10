var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const env = process.env;
let conf = {
  host: env.MYSQL_HOSTNAME,
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  db: env.MYSQL_DBNAME
};

var con = mysql.createConnection({
  host: conf.host,
  user: conf.username,
  password: conf.password,
  database: conf.db
});

con.connect(function(err) {
  if (err) {
    console.error("Database connection error", err);
    // Bit of a hack to retry until mysql becomes available
    setTimeout(function () {
      throw err;
    }, 1000);
  } else {
    console.log("Database connection success");
  }
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
