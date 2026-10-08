const cities = [
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Dublin", lat: 53.3498, lon: -6.2603 },
    { name: "Beijing", lat: 39.9042, lon: 116.4074 },
    { name: "Chengdu", lat: 30.5728, lon: 104.0668 },
]
document.addEventListener("DOMContentLoaded", () => {
    createCitybuttons();
    fetchWeatherData(cities[0].lat, cities[0].lon, cities[0].name);
});

function createCitybuttons() {
    const cityButtonsContainer = document.getElementById("city-buttons");
    cities.forEach((city) => {
        const button = document.createElement("button");
        button.textContent = city.name;
        button.addEventListener("click", () => {
            fetchWeatherData(city.lat, city.lon, city.name);
        });
        cityButtonsContainer.appendChild(button);
    });
}

function fetchWeatherData(lat, lon, cityName) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&wind_speed_unit=mph`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Weather request failed: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            displayWeatherData(data, cityName);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            document.getElementById("city-name").textContent = "Unable to load weather data";
        });
}

function displayWeatherData(data, cityName) {
    const current = data.current;
    if (!current) {
        throw new Error("Current weather data is unavailable");
    }

    document.getElementById("city-name").textContent = cityName;
    document.getElementById("temperature").textContent = current.temperature_2m;
    document.getElementById("humidity").textContent = current.relative_humidity_2m;
    document.getElementById("wind-speed").textContent = current.wind_speed_10m;
}
