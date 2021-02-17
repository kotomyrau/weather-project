// API KEY
const api_key = "6e569cdf3cfdee395970869f38aa2221";
const notification = document.querySelector(".notification");
const temperatureValue = document.querySelector(".temp-value p");
const temperatureDescription = document.querySelector(".temp-description p");
const location = document.querySelector(".location p");

const weather = {

    temperature : {
        value : 18,
        unit : "celcius"
    },
    
    description : "few clouds",
    city : "London",
    country : "GB"    
};
// function as it will be used multiple times
function displayWeather(){
    temperatureValue.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    temperatureDescription.innerHTML =`weather.description`;
    location.innerHTML = `${weather.city}, ${weather.country}`;
};
//temperative conversion


function getWeather(latitude, longitude) {
    let api = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={api_key}`
}