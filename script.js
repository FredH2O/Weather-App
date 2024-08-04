// weather app

let city = document.getElementById("city").value;
let temperature = document.getElementById("temperature");
let condition = document.getElementById("condition");
let locationHeading = document.querySelector(".location");

console.log(city);

async function fetchWeatherData() {
  const url =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13";
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

    updateLocation(result.location.name);
    updateTemperature(result.current.temp_c, result.current.temp_f);
    updateConditionAndIcon(
      result.current.condition.text,
      result.current.condition.icon
    );
  } catch (error) {
    console.error(error);
  }
}

function updateLocation(locationName) {
  locationHeading.textContent = locationName;
}
function updateTemperature(temperatureC, temperatureF) {
  temperature.textContent = `${temperatureC}°C / ${temperatureF}°F`;
}
function updateConditionAndIcon(text, icon) {
  condition.innerHTML = "";
  condition.textContent = text;

  const ICON_IMG = document.createElement("img");
  ICON_IMG.src = icon;
  ICON_IMG.alt = icon;
  condition.appendChild(ICON_IMG);
}

// Call the async function
fetchWeatherData();
