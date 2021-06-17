const express = require("express");
const router = express.Router();

const getWeather = require("../lib/getWeather");

router.get("/", (req, res) => {
  res.render("weather");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  let location = req.body.location;
  let countryCode = req.body.countryCode;

  let data = await getWeather(location, countryCode);

  if (data.cod == "404") {
    res.render("weather", {
      err: "The provided location doesn't exist",
    });
    return;
  }
  console.log(data.weather[0].description)
  console.log(data.main.temp)

  let name = data.name;
  let description = false;
  req.body.descriptioncb ? description = data.weather[0].description : description;
  let temp = false;
  req.body.temperaturecb ? temp = data.main.temp + " \xB0c" : temp;
  let feels_like = false;
  req.body.feels_likecb ? feels_like = data.main.feels_like: feels_like;

  let sunrise = new Date(data.sys.sunrise * 1000);  
  let sunset = new Date(data.sys.sunset * 1000);

  let sunrisesunsetcb = false
  req.body.sunrisesunsetcb ? sunrisesunsetcb = true: sunrisesunsetcb = false;

  res.render("weather", {
    location,
    countryCode,
    name,
    data: { description, temp, feels_like },
    sunrisesunsetcb,
    sunrise,
    sunset,
    displayWeather: true,
  });

});

module.exports = router;
