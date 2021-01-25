function displayDate(date) {
  let now = new Date();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = document.querySelector("#current-day");
  let currentTime = document.querySelector("#current-time");
  let currentDate = document.querySelector("#current-date");
  let currentDateValue = now.getDate();
  let currentDayValue = now.getDay();
  let currentMonthValue = now.getMonth();
  let currentYearValue = now.getFullYear();
  let currentHoursValue = now.getHours();
  let currentMinutesValue = now.getMinutes();
  currentDay.innerHTML = `${days[currentDayValue]}`;
  currentTime.innerHTML = `${currentHoursValue}:${currentMinutesValue}`;
  currentDate.innerHTML = `${months[currentMonthValue]} ${currentDateValue}, ${currentYearValue}`;
}

// Getting the weather info from the weather API and diplaying it
function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temperature");
  let weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  let mainIconElement = document.querySelector("#main-icon");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feels-like");
  let temperatureResponse = Math.round(response.data.main.temp);
  let weatherDescriptionResponse = response.data.weather[0].main;
  let cityResponse = `${response.data.name}`;
  let iconResponse = `${response.data.weather[0].icon}`;
  weatherDescriptionElement.innerHTML = `${weatherDescriptionResponse}`;
  cityElement.innerHTML = `${cityResponse}`;
  temperatureElement.innerHTML = temperatureResponse;
  humidityElement.innerHTML = response.data.main.humidity;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  mainIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconResponse}@2x.png`
  );
  mainIconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let weatherApiKey = "8165a17b0d39ff333ddf1c75c84ef1bb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${weatherApiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.getElementById("city-input").value;
  searchCity(city);
}
// Getting the weather using geolocation
function retrievePosition(position) {
  let weatherApiKey = "8165a17b0d39ff333ddf1c75c84ef1bb";
  let units = "metric";
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&units=${units}&appid=${weatherApiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function geolocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let now = new Date();
displayDate(now);
let search = document.querySelector("#search-form");
let searchCurrentLocation = document.querySelector("#current-location-btn");
searchCurrentLocation.addEventListener("click", geolocate);
search.addEventListener("submit", handleSubmit);
searchCity("Paris");
