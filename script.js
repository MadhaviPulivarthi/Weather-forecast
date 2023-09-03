// time for the webpage active time refreshes after every  1000 ticks
// time is set to 24 hour format
function formatDate(timestamp) {
    let now = new Date(timestamp);
    let hours = now.getHours();
    if (hours < 10) {
      hours = `13 ? 0${hour} %12:hour`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    // arreys for week days 
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[now.getDay()];
    return `${day} ${hours}:${minutes}`;
  }
  
  function formatDay(timestamp) {
    // time refresh every after 1000ticks
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }
  // selecting every element from html by query selector universal call
  // iam using function display forecast to display every 
  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="card-group">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          // i have shifted total elements of html to js to make select every attribute in simple way
          // call*ing the required data from json for 7 days by accurate data names in json to js 
          // json : javascript object notation
          // [0] is used due data in json is represent arrey to for example if we 2 element in arrey the 1 one responds so we are callin the data with along arrey
          `
                  <div class="card text-center h-50">
                          <div class="card-body">
                      <h5 class="card-title">
                                                               
                          <p>${formatDay(forecastDay.dt)}</p>
                      </h5>
                      <p class="card-text"> 
                      <span>${forecastDay.weather[0].description}</span>
                          <br />
                          <img src="http://openweathermap.org/img/wn/${
                            forecastDay.weather[0].icon
                          }@2x.png">
                          <br />
                          <span class="maxTemp">${Math.round(
                            forecastDay.temp.max
                          )}°</span>
                          <span class="minTemp">${Math.round(
                            forecastDay.temp.min
                          )}°</span>
                      </p>
                      </div>
                  </div>`;
                  // math.floor is used to display the values in approx like direct round fig no dec forms
      }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  function getForecast(coordinates) {
    // assigning the json data to js with api link 
    let apiKey = "4ce8a41d369b3b6bd1c2a8e544e3b3ac";
    // i have taken position api to get weather at current location
    // metric is used to display temp cel default 
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  // displaying the weather data by calling them again to html 
  // mainly focused on id tags in js class tags in css in order break the confusion 
  function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    celsiusTemperature = response.data.main.temp;
    document.querySelector("#degree").innerHTML = Math.round(celsiusTemperature);
    let description = document.querySelector("#weather-condition");
    // mentioned [0] because of arrey 
    description.innerHTML = response.data.weather[0].description;
    let iconElement = document.querySelector("#icon");
    // default icon is used in website 
    // calling the icons with link of open weather map icons 
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
  
    getForecast(response.data.coord);
  }
  // fetching location applied 
  // calling the fetching data from json with link seperate for it 
  // same metric is used in order to fluctuate in diff unit 
  function searchCity(city) {
    let apiKey = "4ce8a41d369b3b6bd1c2a8e544e3b3ac";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  // adding eventlistener
  // function to search bar and button too
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    searchCity(city);
  }
  // current day weather forecast 
  // calling json data 
  function searchLocation(position) {
    let apiKey = "4ce8a41d369b3b6bd1c2a8e544e3b3ac";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    // axios is used for js async 
    // restricting the js from calling all data at once 
  }
  // getting the location from user for weather report 
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  // functions to location button 
  let currentLocationButton = document.querySelector("#user-location");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  

  //  unit conversion
  //  we all know the formulea to convert cel to faht  (cel*9)/5+32
  function convertTemp(event) {
    event.preventDefault();
    celsius.classList.remove("active");
    conversion.classList.add("active");
    let degree = document.querySelector("#degree");
    let temperature = degree.innerHTML;
    degree.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  }
  
  function revertTemp(event) {
    event.preventDefault();
    celsius.classList.add("active");
    conversion.classList.remove("active");
    let degree = document.querySelector("#degree");
    degree.innerHTML = Math.round(celsiusTemperature);
  }
  
  let celsiusTemperature = null;
  
  let conversion = document.querySelector("#fahrenheit");
  conversion.addEventListener("click", convertTemp);
  
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", revertTemp);
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
// defualt location is selected 
// delhi is default location for india as it is capital and primary time zone in india
searchCity("delhi");
