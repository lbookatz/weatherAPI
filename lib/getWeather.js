const fetch = require('node-fetch');
require('dotenv').config();


const url = `http://api.openweathermap.org/data/2.5/weather?q=Manchester,gb&units=metric&appid=${process.env.appid}`;

const getWeather = async() => {
    let data = await fetch(url);
    return await data.json();
    // console.log(await data.weather.id)
}

module.exports = getWeather;
