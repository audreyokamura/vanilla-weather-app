function showTemperature(response) {
  console.log(response.data);
}

let apiKey = "47b6364afb2ed8bf7f7344ac4ea61231";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=São%20Paulo&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(showTemperature);
