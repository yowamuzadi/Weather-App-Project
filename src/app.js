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
