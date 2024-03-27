// select element from DOM
const bodyElement = document.body;
const weatherCityElement = document.querySelector('.weather_city');
const weatherImagesElement = document.querySelector('.weather_img');
const weatherDegreesElement = document.querySelector('.weather_degrees');
const adviceTextElement = document.querySelector('.advise_text');

// API URL
const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

// call to recover the weather forecasts
async function translate() {

    // API URL
    //to edit the url
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

    const response = await fetch(API_URL);
    const jsonData = await response.json();

    console.log(jsonData);

};