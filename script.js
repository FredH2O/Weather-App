// weather app

let cityInput = document.getElementById("city");
let searchBtn = document.getElementById("search");
let temperature = document.getElementById("temperature");
let condition = document.getElementById("condition");
let locationHeading = document.querySelector(".location");

searchBtn.addEventListener("click", function () {
  const cityPicked = cityInput.value;
  fetchWeatherData(cityPicked);
});

async function fetchWeatherData(city) {
  if (!city) {
    locationHeading.textContent = "Enter a city or country.";
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
    console.log(result);

    updateLocation(result.location.name, result.location.country);
    updateTemperature(result.current.temp_c, result.current.temp_f);
    updateConditionAndIcon(
      result.current.condition.text,
      result.current.condition.icon
    );
  } catch (error) {
    console.error(error);
  }
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
  const ICON_IMG = document.createElement("img");
  ICON_IMG.classList.add("icon-img");
  ICON_IMG.src = icon;
  ICON_IMG.alt = icon;

  condition.innerHTML = "";
  condition.textContent = text;
  condition.appendChild(ICON_IMG);
}

// Call the async function
fetchWeatherData();
