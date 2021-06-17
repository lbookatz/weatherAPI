const fetch = require('node-fetch');
require('dotenv').config();

// const url = `http://api.openweathermap.org/data/2.5/weather?q=Manchester,gb&units=metric&appid=${process.env.appid}`;

const getWeather = async(location = process.env.location ,countrycode = process.env.countrycode) => {

    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location},${countrycode}&units=metric&appid=${process.env.appid}`);
    return await data.json();
    // console.log(await data.weather.id)
}

module.exports = getWeather;
