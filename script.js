// weather app

let cityInput = document.getElementById("city");
let searchBtn = document.getElementById("search");
let temperature = document.getElementById("temperature");
let conditionDiv = document.querySelector(".condition-div");
let locationHeading = document.querySelector(".location");
let body = document.querySelector("body");
let timeZone = document.querySelector(".time-zone");

searchBtn.addEventListener("click", function () {
  const CITY_PICKED = cityInput.value;
  fetchWeatherData(CITY_PICKED);
  cityInput.value = "";
});

cityInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const CITY_PICKED = cityInput.value;
    fetchWeatherData(CITY_PICKED);
    cityInput.value = "";
  }
});

async function fetchWeatherData(city) {
  /*if (!city) {
    alert("Enter a city or country.");
    return;
  }*/

  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(
    city
  )}`;

  const options = {
    method: "GET",

    headers: {
      "x-rapidapi-key": "73736933c8msh0e36fc0e81a021cp1634e9jsn68c86f8cf32e",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response not okay.");
    }

    const result = await response.json(); // extract data using result
    console.log(result);

    updateLocation(result.location.name, result.location.country);
    updateTemperature(result.current.temp_c, result.current.temp_f);
    updateConditionAndIcon(
      result.current.condition.text,
      result.current.condition.icon
    );
    timeZoneArea(result.location.tz_id);
  } catch (error) {
    console.error(error);
  }
}

function timeZoneArea(timeLocale) {
  const optionsTime = {
    timeZone: timeLocale,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const formattedTime = new Intl.DateTimeFormat([], optionsTime);
  timeZone.textContent = `${formattedTime.format(new Date())}`;
}

function updateLocation(locationName, countryName) {
  locationHeading.textContent = `${countryName}, ${locationName}`;
}

function updateTemperature(temperatureC, temperatureF) {
  temperature.textContent = `${temperatureC}°C / ${temperatureF}°F`;
  if (temperatureC >= 25) {
    temperature.style.color = "Red";
  } else if (temperatureC >= 15) {
    temperature.style.color = "Orange";
  } else {
    temperature.style.color = "Blue";
  }
}

function updateConditionAndIcon(text, icon) {
  conditionDiv.innerHTML = "";
  const ICON_IMG = document.createElement("img");
  const TEXT_CONDITION = document.createElement("p");
  ICON_IMG.classList.add("icon-img");
  ICON_IMG.src = icon;
  ICON_IMG.alt = icon;

  TEXT_CONDITION.textContent = `${text}`;

  conditionDiv.appendChild(TEXT_CONDITION);
  conditionDiv.appendChild(ICON_IMG);

  const WEATHER = text.toLowerCase();

  switch (true) {
    case WEATHER.includes("rain"):
      body.style.backgroundImage = "url('images/rainy.jpg')";
      break;
    case WEATHER.includes("sunny"):
      body.style.backgroundImage = "url('images/sunny.jpg')";
      break;
    case WEATHER.includes("clear"):
      body.style.backgroundImage = "url('images/clear.jpg')";
      break;
    case WEATHER.includes("snow"):
      body.style.backgroundImage = "url('images/snow.jpg')";
      break;
    case WEATHER.includes("cloud") || WEATHER.includes("overcast"):
      body.style.backgroundImage = "url('images/cloudy.jpg')";
      break;
    default:
      body.style.backgroundImage = "url('images/backgroundImg.jpg')";
      break;
  }
}
