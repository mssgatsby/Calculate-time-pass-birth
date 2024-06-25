document.addEventListener("DOMContentLoaded", () => {
  const birthYear = localStorage.getItem("birthYear");
  const birthMonth = localStorage.getItem("birthMonth");
  const birthDay = localStorage.getItem("birthDay");

  if (birthYear && birthMonth && birthDay) {
    const birthDate = new Date(birthYear, birthMonth, birthDay);
    updatePassedTime(birthDate);
  }
});

function validate() {
  const form = document.getElementById("birthdate-form");
  if (form.checkValidity()) {
    calculateTimePassed();
  } else {
    let required = document.getElementById("filling-required");
    required.style.display = "block";
  }
}

function calculateTimePassed() {
  const year = parseInt(document.getElementById("year").value);
  const month = parseInt(document.getElementById("month").value) - 1;
  const day = parseInt(document.getElementById("day").value);
  const hour = parseInt(document.getElementById("hour").value) || 0;
  const minute = parseInt(document.getElementById("minute").value) || 0;
  const second = parseInt(document.getElementById("second").value) || 0;

  localStorage.setItem("birthYear", year);
  localStorage.setItem("birthMonth", month);
  localStorage.setItem("birthDay", day);

  const birthdate = new Date(year, month, day, hour, minute, second);
  updatePassedTime(birthdate);
}
let input = document.getElementById("birthdate-form");
let result = document.getElementById("result");

function updatePassedTime(birthdate) {
  function calculateAndDisplay() {
    const now = new Date();

    let milliseconds = now.getMilliseconds() - birthdate.getMilliseconds();
    let seconds = now.getSeconds() - birthdate.getSeconds();
    let minutes = now.getMinutes() - birthdate.getMinutes();
    let hours = now.getHours() - birthdate.getHours();
    let days = now.getDate() - birthdate.getDate();
    let months = now.getMonth() - birthdate.getMonth();
    let years = now.getFullYear() - birthdate.getFullYear();

    if (milliseconds < 0) {
      milliseconds += 1000;
      seconds--;
    }

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }

    if (minutes < 0) {
      minutes += 60;
      hours--;
    }

    if (hours < 0) {
      hours += 24;
      days--;
    }

    if (days < 0) {
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }
    const formattedDays = days < 10 ? `0${days}` : `${days}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formattedMilliseconds =
      milliseconds < 100
        ? `00${milliseconds}`.slice(-3)
        : `${milliseconds}`.slice(-3);

    result.innerText = `${years} years, ${months} months, ${formattedDays} days, ${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    result.style.display = "flex";

    input.style.display = "none";
    // resultSection.style.display = "block";
  }
  setInterval(calculateAndDisplay, 1);
  // calculateAndDisplay();
}

document.getElementById("reset-button").addEventListener("click", resetTime);

function resetTime() {
  // Clear local storage
  localStorage.removeItem("birthYear");
  localStorage.removeItem("birthMonth");
  localStorage.removeItem("birthDay");

  // Clear the input fields
  document.getElementById("year").value = "";
  document.getElementById("month").value = "";
  document.getElementById("day").value = "";
  document.getElementById("hour").value = "";
  document.getElementById("minute").value = "";
  document.getElementById("second").value = "";

  // Hide the result section and show the input section
  result.style.display = "none";
  input.style.display = "block";
  location.reload();
}
