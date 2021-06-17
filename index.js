const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const getWeather = require("./lib/getWeather");
const app = express();

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

app.get("/", async (req, res) => {
  let data = await getWeather();
  let name = data.name;
  let description = data.weather[0].description;
  let temp = data.main.temp + " \xB0c";
  let feels_like = data.main.feels_like;

  let sunrise  = new Date(data.sys.sunrise * 1000)  
  let sunset  = new Date(data.sys.sunset * 1000)  

res.render('index', {name, data: {description, temp, feels_like},sunrise,sunset});

//   let timesunset = data.sys.sunset;
//   let datesunset = new Date(timesunset)  
//   let sunset = datesunset.toString();


//   let timesunrise = data.sys.sunrise;
//   let datesunrise  = new Date(timesunrise)  
//   let sunrise = datesunrise.toString();

//   let timesunset = data.sys.sunset;
//   let datesunset = new Date(timesunset)  
//   let sunset = datesunset.toString();

//   let sunrise = data.sys.sunrise;
//   let sunset = data.sys.sunset;
//   res.render("index", { name, temp,sunrise,sunset });
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.post("/weather", async (req,res) =>{
  console.log(req.body);
  let location = req.body.location;
  let countryCode = req.body.countryCode;
  let data = await getWeather(location,countryCode);

  if (data.cod == '404') {
    res.render('weather', {
    err:'The provided location doesn\'t exist'
    });
    return;
    }
  

  let name = data.name;
  let description = data.weather[0].description;
  let temp = data.main.temp + " \xB0c";
  let feels_like = data.main.feels_like;

  let sunrise  = new Date(data.sys.sunrise * 1000)  
  let sunset  = new Date(data.sys.sunset * 1000)  

  res.render('index', {name, data: {description, temp, feels_like},sunrise,sunset,listExists: true});

  // res.status(200).json(req.body);
  res.render('weather');
})

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
