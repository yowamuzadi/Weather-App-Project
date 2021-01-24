function showCurrentDay(date) {
  let now = new Date();
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
  let currentDayValue = now.getDay();
  currentDay.innerHTML = `${days[currentDayValue]}`;
}
function showCurrentTime(date) {
  let now = new Date();
  let currentTime = document.querySelector("#current-time");
  let currentHoursValue = now.getHours();
  let currentMinutesValue = now.getMinutes();
  currentTime.innerHTML = `${currentHoursValue}:${currentMinutesValue}`;
}
function showCurrentDate(date) {
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
  let currentDate = document.querySelector("#current-date");
  let currentDateValue = now.getDate();
  let currentMonthValue = now.getMonth();
  let currentYearValue = now.getFullYear();
  currentDate.innerHTML = `${months[currentMonthValue]} ${currentDateValue}, ${currentYearValue}`;
}

// Getting the weather info from the weather API and diplaying it
function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  let cityResponse = `${response.data.name}`;
  cityElement.innerHTML = `${cityResponse}`;

  let temperatureElement = document.querySelector("#current-temperature");
  let temperatureResponse = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperatureResponse;

  let weatherDescriptionResponse = response.data.weather[0].main;
  let weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  weatherDescriptionElement.innerHTML = `${weatherDescriptionResponse}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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
