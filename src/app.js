function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function changeIcon(iconCode) {
  let iconText = "";
  if (iconCode === "01d") {
    iconText = "fas fa-sun";
  } else {
    if (iconCode === "01n") {
      iconText = "fas fa-moon";
    } else {
      if (iconCode === "02d") {
        iconText = "fas fa-cloud-sun";
      } else {
        if (iconCode === "02n") {
          iconText = "fas fa-cloud-moon";
        } else {
          if (iconCode === "03d" || iconCode === "03n") {
            iconText = "fas fa-cloud";
          } else {
            if (iconCode === "04d" || iconCode === "04n") {
              iconText = "fas fa-cloud";
            } else {
              if (iconCode === "09d" || iconCode === "09n") {
                iconText = "fas fa-cloud-showers-heavy";
              } else {
                if (iconCode === "10d" || iconCode === "10n") {
                  iconText = "fas fa-cloud-rain";
                } else {
                  if (iconCode === "11d" || iconCode === "11n") {
                    iconText = "fas fa-poo-storm";
                  } else {
                    if (iconCode === "13d" || iconCode === "13n") {
                      iconText = "fas fa-snowflake";
                    } else {
                      if (iconCode === "50d" || iconCode === "50n") {
                        iconText = "fas fa-smog";
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return iconText;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col forecast">
    <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
    <i class="forecast-icon ${changeIcon(forecastDay.weather[0].icon)}"></i>
    <div class="forecast-temp">
      <span class="forecast-temp-max">${Math.round(
        forecastDay.temp.max
      )}</span>?? 
      <span class="forecast-temp-min">${Math.round(
        forecastDay.temp.min
      )}</span>??
    </div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "47b6364afb2ed8bf7f7344ac4ea61231";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentData(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#current-icon")
    .setAttribute(
      "class",
      `main-icon ${changeIcon(response.data.weather[0].icon)}`
    );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "47b6364afb2ed8bf7f7344ac4ea61231";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentData);
}

function handleSubmit(event) {
  event.preventDefault();
  search(document.querySelector("#city-input").value);
}

function getPosition(position) {
  let apiKey = "47b6364afb2ed8bf7f7344ac4ea61231";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentData);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let unit = "metric";

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let positionButton = document.querySelector("#position-button");
positionButton.addEventListener("click", getCurrentLocation);

search("S??o Paulo");
