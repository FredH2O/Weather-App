// weather app
let header = document.getElementById("header");
let cityInput = document.getElementById("city");
let searchBtn = document.getElementById("search");
let tempC = document.getElementById("temp-c");
let tempF = document.getElementById("temp-f");
let windKph = document.getElementById("wind-kph");
let windMph = document.getElementById("wind-mph");
let windStatus = document.getElementById("wind-status");
let conditionDiv = document.querySelector(".condition-div");
let locationHeading = document.querySelector(".location");
let body = document.querySelector("body");
let timeZone = document.querySelector(".time-zone");
let nextTwoDaysDiv = document.querySelector(".next-two-days");
let dateForecastDiv = document.querySelector(".date-forecast");

async function fetchForecast(city) {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(
    city
  )}&days=3`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "73736933c8msh0e36fc0e81a021cp1634e9jsn68c86f8cf32e",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    dateCast(
      result.forecast.forecastday[0].date,
      result.forecast.forecastday[1].date,
      result.forecast.forecastday[2].date
    );

    nextTwoDaysForecast(
      result.forecast.forecastday[0].day.daily_chance_of_rain,
      result.forecast.forecastday[1].day.daily_chance_of_rain,
      result.forecast.forecastday[2].day.daily_chance_of_rain
    );
  } catch (error) {
    console.error(error);
  }
}

async function fetchWeatherData(city) {
  if (!city) {
    alert("Enter a city or country.");
    return;
  }

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
    //console.log(result);

    if (result.error) {
      alert(result.error.message);
      return;
    }

    updateLocation(result.location.name, result.location.country);
    updateTemperature(result.current.temp_c, result.current.temp_f);
    windSpeed(result.current.wind_kph, result.current.wind_mph);
    updateConditionAndIcon(
      result.current.condition.text,
      result.current.condition.icon
    );
    timeZoneArea(result.location.tz_id);
  } catch (error) {
    console.error(error.message);
    locationHeading.textContent = `Please enter city or country.`;
  }
}

function dateCast(today, tomorrow, afterTomorrow) {
  dateForecastDiv.innerHTML = "";

  let todayDate = document.createElement("p");
  let tomorrowDate = document.createElement("p");
  let afterTomorrowDate = document.createElement("p");

  today = today.slice(8, 10);
  tomorrow = tomorrow.slice(8, 10);
  afterTomorrow = afterTomorrow.slice(8, 10);

  todayDate.textContent = today;
  tomorrowDate.textContent = tomorrow;
  afterTomorrowDate.textContent = afterTomorrow;

  dateForecastDiv.appendChild(todayDate);
  dateForecastDiv.appendChild(tomorrowDate);
  dateForecastDiv.appendChild(afterTomorrowDate);
}

function nextTwoDaysForecast(today, tomorrow, afterTomorrow) {
  nextTwoDaysDiv.innerHTML = "";

  let todayForecast = document.createElement("p");
  let tomorrowForecast = document.createElement("p");
  let afterTomorrowForecast = document.createElement("p");

  todayForecast.textContent = `${today}%`;
  tomorrowForecast.textContent = `${tomorrow}%`;
  afterTomorrowForecast.textContent = `${afterTomorrow}%`;

  nextTwoDaysDiv.appendChild(todayForecast);
  nextTwoDaysDiv.appendChild(tomorrowForecast);
  nextTwoDaysDiv.appendChild(afterTomorrowForecast);
}

function timeZoneArea(timeLocale) {
  const optionsTime = {
    timeZone: timeLocale,
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = new Intl.DateTimeFormat([], optionsTime);
  timeZone.textContent = `${formattedTime.format(new Date())}`;
}

function updateLocation(locationName, countryName) {
  locationHeading.innerHTML = `<u>${countryName}, ${locationName}</u><br><br>`;
  header.textContent = "";
}

function updateTemperature(temperatureC, temperatureF) {
  tempC.textContent = `${temperatureC}°C /`;
  tempF.textContent = `${temperatureF}°F`;
  if (temperatureC >= 25) {
    tempC.style.color = "Red";
    tempF.style.color = "Red";
  } else if (temperatureC >= 15) {
    tempC.style.color = "Orange";
    tempF.style.color = "Orange";
  } else {
    tempC.style.color = "Blue";
    tempF.style.color = "Blue";
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

function windSpeed(kph, mph) {
  windKph.textContent = `${kph} KPH`;
  windMph.textContent = `${mph} MPH`;

  if (kph <= 1) {
    windStatus.textContent = "CALM";
  } else if (kph <= 15) {
    windStatus.textContent = "LIGHT BREEZE";
  } else if (kph <= 30) {
    windStatus.textContent = "MODERATE BREEZE";
  } else if (kph <= 50) {
    windStatus.textContent = "STRONG BREEZE";
  } else if (kph <= 75) {
    windStatus.textContent = "GALE";
  } else if (kph <= 117) {
    windStatus.textContent = "STORM";
  } else {
    windStatus.textContent = "HURRICANE";
  }
}

searchBtn.addEventListener("click", function () {
  const CITY_PICKED = cityInput.value;
  fetchWeatherData(CITY_PICKED);
  fetchForecast(CITY_PICKED);
  cityInput.value = "";
});

cityInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const CITY_PICKED = cityInput.value;
    fetchWeatherData(CITY_PICKED);
    fetchForecast(CITY_PICKED);
    cityInput.value = "";
  }
});
