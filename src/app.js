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
