// script.js
const apiKey = "389a4ff3050f42b48a8103529240311"; // Your WeatherAPI key
const weatherDisplay = document.getElementById("weatherDisplay");

// Function to fetch weather by location input
function getWeatherByInput() {
    const location = document.getElementById("locationInput").value;
    if (!location) {
        weatherDisplay.innerHTML = "Please enter a location.";
        return;
    }
    fetchWeatherData(location);
}

// Function to fetch weather by geolocation
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(`${latitude},${longitude}`);
            },
            (error) => {
                weatherDisplay.innerHTML = "Location access denied.";
            }
        );
    } else {
        weatherDisplay.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Function to fetch weather data from WeatherAPI
function fetchWeatherData(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherDisplay.innerHTML = "Could not retrieve weather data.";
        });
}

// Function to display the weather data on the page
function displayWeatherData(data) {
    if (!data || data.error) {
        weatherDisplay.innerHTML = "Weather data not found.";
        return;
    }

    const { location, current } = data;
    const sunrise = "6:30 AM";  // Replace with API's actual sunrise/sunset data if available
    const sunset = "6:45 PM";

    weatherDisplay.innerHTML = `
        <div class="weather-icon">
            <img src="${current.condition.icon}" alt="Weather icon">
        </div>
        <h2>Weather in ${location.name}, ${location.region}</h2>
        <p class="weather-info">Temperature: ${current.temp_c}°C</p>
        <p class="weather-info">Condition: ${current.condition.text}</p>
        <p class="weather-info">Feels Like: ${current.feelslike_c}°C</p>

        <div class="weather-details">
            <div>
                <strong>Wind Speed</strong>
                <p>${current.wind_kph} kph</p>
            </div>
            <div>
                <strong>Humidity</strong>
                <p>${current.humidity}%</p>
            </div>
            <div>
                <strong>Visibility</strong>
                <p>${current.vis_km} km</p>
            </div>
        </div>
        <div class="weather-details">
            <div>
                <strong>Sunrise</strong>
                <p>${sunrise}</p>
            </div>
            <div>
                <strong>Sunset</strong>
                <p>${sunset}</p>
            </div>
        </div>
    `;
    weatherDisplay.classList.remove("hidden");
}
