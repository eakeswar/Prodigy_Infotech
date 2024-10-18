const apiKey = "1de8876972bd1a69dc3332b45c1c5bd3"; // Replace with your OpenWeatherMap API key

// Function to get weather data based on user's location
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherData(lat, lon);
      },
      (error) => {
        alert(
          "Unable to retrieve your location. Please try searching by city name."
        );
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Function to get weather data based on user-inputted city name
function getWeatherByCity() {
  const cityName = document.getElementById("location-input").value;
  if (cityName) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => displayWeatherData(data))
      .catch((error) => alert("City not found. Please try again."));
  } else {
    alert("Please enter a city name.");
  }
}

// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => displayWeatherData(data))
    .catch((error) => alert("Failed to retrieve weather data."));
}

// Function to display weather data on the webpage
function displayWeatherData(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById(
    "conditions"
  ).textContent = `Conditions: ${data.weather[0].description}`;
}
