const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const app = express();

const indexRouter = require('./routes/indexRouter');
const weatherRouter = require('./routes/weatherRouter');
const errRouter = require('./routes/errRouter');

//not needed anymore
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);

app.set("views", path.join(__dirname, "views"));

app.set("view engine", ".hbs");

app.use('/', indexRouter);
app.use('/weather', weatherRouter);
app.use('*', errRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});
