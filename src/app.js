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
