// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value h4");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".user-location p");
const notificationElement = document.querySelector(".notification");
const spotifyURI = document.querySelector(".spotify-uri");
const backgroundElement = document.querySelector(".main-container");
const locationIconElement = document.querySelector(".location-icon");

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
    navigator.geolocation.getCurrentPosition(userLocation, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S LOCATION
function userLocation(location){
    let longitude = location.coords.longitude;
    let latitude = location.coords.latitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
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
            changeBackground();
            displayMusic();
            
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}<span>°C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
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

function changeBackground() {
    if(weather.iconId[2] == "n"){
        // backgroundElement.style.backgroundImage = "linear-gradient(#E1DDC9, #FEFEFE)";
        tempElement.style.color = "#FEFEFE"
        descElement.style.color = "#FEFEFE"
        locationElement.style.color = "#FEFEFE"
        locationIconElement.style.color = "#FEFEFE"
    }
}

function displayMusic() {
    const dayOrNight = weather.iconId.slice(-1);
    const atmosphere = weather.iconId.slice(0);
    switch(weather.main){
        case "thunderstorm": 
        if(dayOrNight == "d"){ 
            // beats & rhymes
            const storm_D_URI = "37i9dQZF1DXcA6dRp8rwj6";
            spotifyURI.innerHTML = `<a href="spotify:playlist:${storm_D_URI}" target="blank">beats & rhymes<br> <img src="../spotify-playlist-images/beats-rhymes.jpg" alt="beats and rhymes cover art"></a>`;
            backgroundElement.style.backgroundImage = "linear-gradient(#727272, #FEFEFE)";
        } else if(dayOrNight == "n"){
            // dark & stormy
            const storm_N_URI = "37i9dQZF1DX2pSTOxoPbx9";
            spotifyURI.innerHTML = `<a href="spotify:playlist:${storm_N_URI}" target="blank">dark & stormy<br> <img src="../spotify-playlist-images/dark-story.jpg" alt="dark and stormy cover art"></a>`;
            backgroundElement.style.backgroundImage = "linear-gradient(#424C57, #FEFEFE)";
        }
        break;
        case "rain": 
            if(dayOrNight == "d"){ 
                // rainy day
                const rain_D_URI = "37i9dQZF1DXbvABJXBIyiY";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${rain_D_URI}" target="blank">rainy day<br> <img src="../spotify-playlist-images/rainy-day.jpg" alt="rainy day cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#95948F, #FEFEFE)";
            } else if(dayOrNight == "n"){
                // spotify & chill
                const rain_N_URI = "37i9dQZF1DX7ZnTv0GKubq";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${rain_N_URI}" target="blank">spotify & chill<br> <img src="../spotify-playlist-images/spotify-chill.jpg" alt="spotify and chill cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#334962, #FEFEFE)";
            }
            break;
        case "drizzle": 
            if(dayOrNight == "d"){ 
                // creamy
                const drizzle_D_URI = "37i9dQZF1DXdgz8ZB7c2CP";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${drizzle_D_URI}" target="blank">creamy<br> <img src="../spotify-playlist-images/creamy.jpg" alt="creamy cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#D3D2CB, #FEFEFE)";
            } else if(dayOrNight == "n"){
                // chill vibes
                const drizzle_N_URI = "37i9dQZF1DX889U0CL85jj";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${drizzle_N_URI}" target="blank">chill vibes<br> <img src="../spotify-playlist-images/chill-vibes.jpg" alt="chill vibes cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#254265, #FEFEFE)";
            }
            break;
        case "snow": 
            if(dayOrNight == "d"){ 
                // coffee & chill
                const snow_D_URI = "37i9dQZF1DXa1BeMIGX5Du";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${snow_D_URI}" target="blank">coffee & chill<br> <img src="../spotify-playlist-images/coffee-chill.jpg" alt="coffee and chill cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#FFFEF6, #FEFEFE)";
            } else if(dayOrNight == "n"){
                // winter sounds
                const snow_N_URI = "37i9dQZF1DX4H7FFUM2osB";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${snow_N_URI}" target="blank">winter sounds<br> <img src="../spotify-playlist-images/winter-sounds.jpg" alt="winter sounds cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#8C8C8C, #FEFEFE)";
            }
            break;
        case ("mist"): 
        case ("smoke"): 
        case ("haze"): 
        case ("dust"): 
        case ("fog"): 
        case ("sand"): 
        case ("dust"): 
        case ("ash"): 
        case ("squall"):
        case ("tornado"):  
            if(dayOrNight == "d"){ 
                // duvet day
                const atmosphere_D_URI = "37i9dQZF1DXdNR7UbdVQiC";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${atmosphere_D_URI}" target="blank">duvet day<br> <img src="../spotify-playlist-images/duvet-day.jpg" alt="duvet day cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#E1DDC9, #FEFEFE)";
            } else if(dayOrNight == "n"){
                // all the feels
                const atmosphere_N_URI = "37i9dQZF1DX7gIoKXt0gmx";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${atmosphere_N_URI}" target="blank">all the feels<br> <img src="../spotify-playlist-images/all-the-feels.jpg" alt="all the feels cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#676767, #FEFEFE)";
            }
            break;
        case "clouds":
            if(dayOrNight == "d"){ 
                // chill hits 
                const clouds_D_URI = "37i9dQZF1DX4WYpdgoIcn6";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${clouds_D_URI}" target="blank">chill hits<br> <img src="../spotify-playlist-images/chill-hits.jpg" alt="chill hits cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#FFFADE, #FEFEFE)";
            } else if(dayOrNight == "n"){
                // sweater weather instrumentals 
                const clouds_N_URI = "37i9dQZF1DWUvZBXGjNCU4";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${clouds_N_URI}" target="blank">sweater weather<br> <img src="../spotify-playlist-images/sweater-weather.jpg" alt="sweater weather cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#4A5765, #FEFEFE)";
            }
            break;
        case "clear":
            if(dayOrNight == "d"){ 
                // happy beats 
                const clear_D_URI = "37i9dQZF1DWSf2RDTDayIx";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${clear_D_URI}" target="blank">happy beats<br> <img src="../spotify-playlist-images/happy-beats.jpg" alt="happy beats cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#FFED8C, #FEFEFE)";
            } else if(dayOrNight == "n"){
                // night pop
                const clear_N_URI = "37i9dQZF1DXbcP8BbYEQaO";
                spotifyURI.innerHTML = `<a href="spotify:playlist:${clear_N_URI}" target="blank">night pop<br> <img src="../spotify-playlist-images/night-pop.jpg" alt="night pop cover art"></a>`;
                backgroundElement.style.backgroundImage = "linear-gradient(#00346F, #FEFEFE)";
            }
            break;
        }
}