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
}

let apiKey = "47b6364afb2ed8bf7f7344ac4ea61231";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=São%20Paulo&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrentData);
