// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value h4");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".user-location p");
const notificationElement = document.querySelector(".notification");
const spotifyURI = document.querySelector(".spotify-uri");


// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;

// add date 
// API KEY
const key = "6e569cdf3cfdee395970869f38aa2221";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.country = data.sys.country;
            weather.iconId = data.weather[0].icon;
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
    
            weather.city = data.name;
            weather.main = data.weather[0].main.toLowerCase()
        })
        .then(function(){
            displayWeather();
            displayMusic();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}<span>°C</span>`;
    descElement.innerHTML = weather.description + weather.iconId + weather.main;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    // if(weather.main.toLowerCase() == "rain") {
    //     const rainURI = "37i9dQZF1DXbvABJXBIyiY";
    //     spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${rainURI}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    // }
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

function displayMusic() {
    const dayOrNight = weather.iconId.slice(-1);
    const atmosphere = weather.iconId.slice(0);
    switch(weather.main){
        case "thunderstorm": 
        if(dayOrNight == "d"){ 
            // beats & rhymes
            const storm_D_URI = "37i9dQZF1DXcA6dRp8rwj6";
            spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${storm_D_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
        } else if(dayOrNight == "n"){
            // dark & stormy
            const storm_N_URI = "37i9dQZF1DX2pSTOxoPbx9";
            spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${storm_N_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
        }
        break;
        case "rain": 
            if(dayOrNight == "d"){ 
                // rainy day
                const rain_D_URI = "37i9dQZF1DXbvABJXBIyiY";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${rain_D_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            } else if(dayOrNight == "n"){
                // spotify & chill
                const rain_N_URI = "37i9dQZF1DX7ZnTv0GKubq";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${rain_N_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            }
            break;
        case "drizzle": 
            if(dayOrNight == "d"){ 
                // creamy
                const drizzle_D_URI = "37i9dQZF1DXdgz8ZB7c2CP";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${drizzle_D_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            } else if(dayOrNight == "n"){
                // chill vibes
                const drizzle_N_URI = "37i9dQZF1DX889U0CL85jj";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${drizzle_N_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            }
            break;
        case "snow": 
            if(dayOrNight == "d"){ 
                // coffee & chill
                const snow_D_URI = "37i9dQZF1DXa1BeMIGX5Du";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${snow_D_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            } else if(dayOrNight == "n"){
                // winter sounds
                const snow_N_URI = "37i9dQZF1DX4H7FFUM2osB";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${snow_N_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            }
            break;
        case (atmosphere == "5"): 
            if(dayOrNight == "d"){ 
                // duvet day
                const atmosphere_D_URI = "37i9dQZF1DXdNR7UbdVQiC";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${atmosphere_D_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            } else if(dayOrNight == "n"){
                // all the feels
                const atmosphere_N_URI = "37i9dQZF1DX7gIoKXt0gmx";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${atmosphere_N_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            }
            break;
        case "clouds":
            if(dayOrNight == "d"){ 
                // chill hits 
                const clouds_D_URI = "37i9dQZF1DX4WYpdgoIcn6";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${clouds_D_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            } else if(dayOrNight == "n"){
                // sweater weather instrumentals 
                const clouds_N_URI = "37i9dQZF1DWUvZBXGjNCU4";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${clouds_N_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            }
            break;
        case "clear":
            if(dayOrNight == "d"){ 
                // happy beats 
                const clouds_D_URI = "37i9dQZF1DWSf2RDTDayIx";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${clouds_D_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            } else if(dayOrNight == "n"){
                // night pop
                const clouds_N_URI = "37i9dQZF1DXbcP8BbYEQaO";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${clouds_N_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            }
            break;
        default:
            if(dayOrNight == "d"){ 
                // duvet day
                const atmosphere_D_URI = "37i9dQZF1DXdNR7UbdVQiC";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${atmosphere_D_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            } else if(dayOrNight == "n"){
                // all the feels
                const atmosphere_N_URI = "37i9dQZF1DX7gIoKXt0gmx";
                spotifyURI.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${atmosphere_N_URI}" width="100%" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            }
            break;
        }
}