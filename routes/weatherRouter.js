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
  // console.log(data.weather[0].description)
  // console.log(data.main.temp)

  let name = data.name;

  const description = req.body.descriptioncb ? data.weather[0].description : false;
  // let description = false;
  // req.body.descriptioncb ? description = data.weather[0].description : description;
  const temp = req.body.temperaturecb? data.main.temp + " \xB0c" : false;
  const feels_like = req.body.feels_likecb ?  data.main.feels_like: false;

  const sunrise = new Date(data.sys.sunrise * 1000);  
  const sunset = new Date(data.sys.sunset * 1000);

  const sunrisesunsetcb =  req.body.sunrisesunsetcb ? true: false;

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
