const express = require("express");
const router = express.Router();

const getWeather = require('../lib/getWeather')

router.get("/", async (req, res) => {
  let data = await getWeather();
  let name = data.name;
  let description = data.weather[0].description;
  let temp = data.main.temp + " \xB0c";
  let feels_like = data.main.feels_like;

  let sunrise = new Date(data.sys.sunrise * 1000);
  let sunset = new Date(data.sys.sunset * 1000);

  res.render("index", {
    name,
    data: { description, temp, feels_like },
    sunrise,
    sunset,
  });

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

module.exports = router;
