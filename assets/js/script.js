// select element from DOM
const bodyElement = document.body;
const weatherCityElement = document.querySelector('.weather_city');
const weatherImagesElement = document.querySelector('.weather_img');
const weatherDegreesElement = document.querySelector('.weather_degrees');
const adviceTextElement = document.querySelector('.advise_text');



// the error of recover latitude and longitude
function onError() {

    // show geolocation disabled content and suggest to active geolocation
    weatherCityElement.innerText = 'Geolocation disabled';
    weatherImagesElement.src = './assets/img/geolocation_disabled.png';
    weatherDegreesElement.innerText = '...';
    weatherImagesElement.alt = 'Geolocation disabled image';
    adviceTextElement.innerText = 'Please active Geolocation';

    // js_loading stop
    bodyElement.classList.remove('js_loading');

};

// the succes of recover latitude and longitude
function onSucces(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // call to recover the weather forecasts
    async function getWeather() {

        // API keys
        const API_KEYS = 'b37eb84465d8cef85d7150bd2a7c5d41'

        // API URL
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEYS}&units=metric`;

        const response = await fetch(API_URL);
        const jsonData = await response.json();

        console.log(jsonData);

        // show geolocation content
        weatherCityElement.innerText = jsonData.name;
        weatherImagesElement.src = `./assets/img/${jsonData.weather[0].icon}.png`;
        weatherDegreesElement.innerText = Math.floor(jsonData.main.temp);
        weatherImagesElement.alt = 'icon weather';
        adviceTextElement.innerText = 'Please active Geolocation';

        // js_loading stop
        bodyElement.classList.remove('js_loading');

    };

    // invok getWeather function
    getWeather();

};


// recover latitude and longitude
navigator.geolocation.getCurrentPosition(onSucces, onError);