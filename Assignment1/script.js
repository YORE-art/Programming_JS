const cities = [
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Dublin", lat: 53.3498, lon: -6.2603 },
    { name: "Beijing", lat: 39.9042, lon: 116.4074 },
    { name: "Chengdu", lat: 30.5728, lon: 104.0668 }
];

document.addEventListener("DOMContentLoaded", function() {
    createCityButtons();
    fetchWeatherData(cities[0].lat, cities[0].lon, cities[0].name);
});

function createCityButtons() {
    const container = document.getElementById("city-buttons");

    cities.forEach(function(city) {
        const button = document.createElement("button");
        button.textContent = city.name;

        button.addEventListener("click", function() {
            fetchWeatherData(city.lat, city.lon, city.name);
        });

        container.appendChild(button);
    });
}

function fetchWeatherData(lat, lon, cityName) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Weather request failed");
            }

            return response.json();
        })
        .then(function(data) {
            displayWeatherData(data, cityName);
        })
        .catch(function(error) {
            console.error("Weather error:", error);
        });
}

function displayWeatherData(data, cityName) {
    document.getElementById("city-name").textContent = cityName;

    document.getElementById("temperature").textContent =
        data.current.temperature_2m;

    document.getElementById("humidity").textContent =
        data.current.relative_humidity_2m;

    document.getElementById("wind-speed").textContent =
        data.current.wind_speed_10m;
}
