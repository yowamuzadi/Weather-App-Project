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
  let currentDate = document.querySelector("#current-date");
  let currentDateValue = now.getDate();
  let currentDayValue = now.getDay();
  let currentMonthValue = now.getMonth();
  let currentYearValue = now.getFullYear();
  currentDay.innerHTML = `${days[currentDayValue]}`;
  currentDate.innerHTML = `${months[currentMonthValue]} ${currentDateValue}, ${currentYearValue}`;
}
function formatHour(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Getting the weather info from the weather API and diplaying it
function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temperature");
  let weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  let mainIconElement = document.querySelector("#main-icon");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feels-like");
  let currentTime = document.querySelector("#current-time");
  let temperatureResponse = Math.round(response.data.main.temp);
  let weatherDescriptionResponse = response.data.weather[0].main;
  let cityResponse = `${response.data.name}`;
  let iconResponse = `${response.data.weather[0].icon}`;
  currentTime.innerHTML = `${formatHour(response.data.dt * 1000)}`;
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
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(forecast);
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="bg-light mb-3 prev card-body">
            <div class="card-title">${formatHour(forecast.dt * 1000)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" />
            <div class="card-title"><strong>${Math.round(
              forecast.main.temp
            )}°</strong> 7°</div>
            <div class="card-text row">
                <small class="col-12">Feels like: ${Math.round(
                  forecast.main.feels_like
                )}°</small>
                <small class="col-12">Humidity: ${
                  forecast.main.humidity
                }%</small>
                <small class="col-12">Wind: ${Math.round(
                  forecast.wind.speed
                )}km/h</small>
            </div>
          </div>
  `;
  }
}
function searchCity(city) {
  let weatherApiKey = "8165a17b0d39ff333ddf1c75c84ef1bb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${weatherApiKey}`;
  axios.get(apiUrl).then(displayWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${weatherApiKey}`;
  axios.get(apiUrl).then(displayForecast);
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

function displayFTemp(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCTemp(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let now = new Date();
let search = document.querySelector("#search-form");
let searchCurrentLocation = document.querySelector("#current-location-btn");

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCTemp);

displayDate(now);
searchCurrentLocation.addEventListener("click", geolocate);
search.addEventListener("submit", handleSubmit);
searchCity("Paris");
