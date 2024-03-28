// select element from DOM
const bodyElement = document.body;
const weatherCityElement = document.querySelector('.weather_city');
const weatherImagesElement = document.querySelector('.weather_img');
const weatherDegreesElement = document.querySelector('.weather_degrees');
const adviceTextElement = document.querySelector('.advise_text');
const advicePanelElement = document.querySelector('.advise > .panel');


// recover latitude and longitude
navigator.geolocation.getCurrentPosition(onSucces, onError);


// the error of recover latitude and longitude
function onError() {

    // show geolocation disabled content and suggest to active geolocation
    weatherCityElement.innerText = 'Geolocation disabled';
    weatherImagesElement.src = './assets/img/geolocation_disabled.png';
    weatherDegreesElement.innerText = '';
    weatherImagesElement.alt = 'Geolocation disabled image';
    adviceTextElement.innerText = 'Please active Geolocation';
    advicePanelElement.classList.add('bg-danger');

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

        const imagesCode = jsonData.weather[0].icon;
        const temperature = jsonData.main.temp;

        // show geolocation content
        weatherCityElement.innerText = jsonData.name;
        weatherImagesElement.src = `./assets/img/${imagesCode}.png`;
        weatherDegreesElement.innerText = `${Math.floor(temperature)}°`;
        weatherImagesElement.alt = 'icon weather';

        // invok getAdvices and show advice in DOM
        adviceTextElement.innerText = getAdvices(imagesCode);

        // invok checkDayNight
        checkDayNight(imagesCode);


        // js_loading stop
        bodyElement.classList.remove('js_loading');

    };


    // function to gave an advice
    function getAdvices(imagesCode) {
        return advices[imagesCode];
    };

    // function to check if it's day or night
    function checkDayNight(imagesCode) {

        // check if the imagesCode includes "n" (for the night) or "d" (for the day)
        if (imagesCode.includes('n')) {

            // add class night
            bodyElement.classList.add('night');

        } else if (imagesCode.includes('d')) {

            // add class day
            bodyElement.classList.add('day');

        };

    }

    // invok getWeather function
    getWeather();

};