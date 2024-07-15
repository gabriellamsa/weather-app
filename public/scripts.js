const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function getApiKey() {
  const response = await fetch('/apiKey');
  const data = await response.json();
  return data.apiKey;
}

async function checkWeather(city) {
  const apiKey = await getApiKey();
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector('.error').style.display = "block";
    document.querySelector('.weather').style.display = "none";
  } else if (response.status == 200) {
    const data = await response.json();

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case 'Clouds':
        weatherIcon.src = "/images/clouds.png";
        break;
      case 'Clear':
        weatherIcon.src = "/images/clear.png";
        break;
      case 'Rain':
        weatherIcon.src = "/images/rain.png";
        break;
      case 'Drizzle':
        weatherIcon.src = "/images/drizzle.png";
        break;
      case 'Mist':
        weatherIcon.src = "/images/mist.png";
        break;
      default:
        weatherIcon.src = "";
    }

    document.querySelector('.weather').style.display = "block";
    document.querySelector('.error').style.display = "none";
  } else {
    console.error("Error fetching weather data:", response.status, response.statusText);
  }
}

searchBtn.addEventListener('click', () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    document.querySelector('.error').style.display = "block";
    document.querySelector('.weather').style.display = "none";
  }
});
