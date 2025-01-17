document.addEventListener("DOMContentLoaded", function () {
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
  let hourFormat = document.querySelector(".hour-format");
  let nextTwoDaysDiv = document.querySelector(".next-two-days");
  let dateForecastDiv = document.querySelector(".date-forecast");
  let todayForecast = document.createElement("p");
  let tomorrowForecast = document.createElement("p");
  let afterTomorrowForecast = document.createElement("p");
  let forecastDivMain = document.querySelector(".forecast-div");
  let rainChance = document.querySelector(".rain-chance");
  let darkModeBtn = document.getElementById("darkMode");
  let container = document.querySelector(".container");

  let todayReading;
  let tomorrowReading;
  let afterTomorrowReading;
  let WEATHER;
  let snow;
  let todaySnowChance;
  let tomorrowSnowChance;
  let afterTomorrowSnowChance;
  let timeCheck;

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

      const result = await response.json();

      if (result.error) {
        alert(result.error.message);
        return;
      }

      updateLocation(result.location.name, result.location.country);
      updateTemperature(result.current.temp_c, result.current.temp_f);
      windSpeed(result.current.wind_kph, result.current.wind_mph);
      timeZoneArea(result.location.tz_id);
      updateConditionAndIcon(
        result.current.condition.text,
        result.current.condition.icon
      );
    } catch (error) {
      console.error(error.message);
      alert("Please enter a city or country!");
      locationHeading.textContent = `Please enter city or country.`;
    }
  }

  async function fetchForecast(city) {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(
      city
    )}&days=5`;

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

      rainChanceBorder();

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
      snowChance(
        result.forecast.forecastday[0].day.daily_will_it_snow,
        result.forecast.forecastday[1].day.daily_will_it_snow,
        result.forecast.forecastday[2].day.daily_will_it_snow
      );

      forecastIcons(
        result.forecast.forecastday[0].day.daily_will_it_rain,
        result.forecast.forecastday[1].day.daily_will_it_rain,
        result.forecast.forecastday[2].day.daily_will_it_rain
      );
    } catch (error) {
      console.error(error);
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

    WEATHER = text.toLowerCase();
    const HOUR = parseInt(timeCheck, 10);

    switch (true) {
      case WEATHER.includes("clear") && (HOUR >= 18 || HOUR < 6):
        body.style.backgroundImage = "url('backgrounds/nightClear.jpg')";
        break;

      case (WEATHER.includes("cloud") || WEATHER.includes("overcast")) &&
        (HOUR >= 18 || HOUR < 6):
        body.style.backgroundImage = "url('backgrounds/nightCloudy.jpg')";
        break;

      case WEATHER.includes("snow") && (HOUR >= 18 || HOUR < 6):
        body.style.backgroundImage = "url('backgrounds/nightCold.jpg')";
        break;

      case WEATHER.includes("sunny") && (HOUR >= 18 || HOUR < 6):
        body.style.backgroundImage = "url('backgrounds/nightSunny.jpg')";
        break;

      case WEATHER.includes("rain"):
        body.style.backgroundImage = "url('backgrounds/rainy.jpg')";
        break;

      case WEATHER.includes("sunny"):
        body.style.backgroundImage = "url('backgrounds/sunny.jpg')";
        break;

      case WEATHER.includes("clear"):
        body.style.backgroundImage = "url('backgrounds/clear.jpg')";
        break;

      case WEATHER.includes("snow"):
        body.style.backgroundImage = "url('backgrounds/snow.jpg')";
        break;

      case WEATHER.includes("cloud") || WEATHER.includes("overcast"):
        body.style.backgroundImage = "url('backgrounds/cloudy.jpg')";
        break;

      default:
        body.style.backgroundImage = "url('backgrounds/backgroundImg.jpg')";
        break;
    }
  }

  function snowChance(snowToday, snowTomorrow, snowAfterTomorrow) {
    todaySnowChance = snowToday;
    tomorrowSnowChance = snowTomorrow;
    afterTomorrowSnowChance = snowAfterTomorrow;
  }

  function dateCast(today, tomorrow, afterTomorrow) {
    const ST = [1, 21, 31];
    const ND = [2, 22];
    const RD = [3, 23];

    dateForecastDiv.innerHTML = "";

    let todayDate = document.createElement("p");
    let tomorrowDate = document.createElement("p");
    let afterTomorrowDate = document.createElement("p");

    today = parseInt(today.slice(8, 10));
    tomorrow = parseInt(tomorrow.slice(8, 10));
    afterTomorrow = parseInt(afterTomorrow.slice(8, 10));

    console.log(today);
    console.log(typeof today);

    if (ST.includes(today)) {
      todayDate.textContent = `${today}st`;
    } else if (ND.includes(today)) {
      todayDate.textContent = `${today}nd`;
    } else if (RD.includes(today)) {
      todayDate.textContent = `${today}rd`;
    } else {
      todayDate.textContent = `${today}th`;
    }

    if (ST.includes(tomorrow)) {
      tomorrowDate.textContent = `${tomorrow}st`;
    } else if (ND.includes(tomorrow)) {
      tomorrowDate.textContent = `${tomorrow}nd`;
    } else if (RD.includes(tomorrow)) {
      tomorrowDate.textContent = `${tomorrow}rd`;
    } else {
      tomorrowDate.textContent = `${tomorrow}th`;
    }

    if (ST.includes(afterTomorrow)) {
      afterTomorrowDate.textContent = `${afterTomorrow}st`;
    } else if (ND.includes(afterTomorrow)) {
      afterTomorrowDate.textContent = `${afterTomorrow}nd`;
    } else if (RD.includes(afterTomorrow)) {
      afterTomorrowDate.textContent = `${afterTomorrow}rd`;
    } else {
      afterTomorrowDate.textContent = `${afterTomorrow}th`;
    }

    dateForecastDiv.appendChild(todayDate);
    dateForecastDiv.appendChild(tomorrowDate);
    dateForecastDiv.appendChild(afterTomorrowDate);
  }

  function nextTwoDaysForecast(today, tomorrow, afterTomorrow) {
    nextTwoDaysDiv.innerHTML = "";

    todayReading = today;
    tomorrowReading = tomorrow;
    afterTomorrowReading = afterTomorrow;

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
      hour12: false,
    };

    const formattedTime = new Intl.DateTimeFormat([], optionsTime);
    timeZone.textContent = `${formattedTime.format(new Date())}`;
    timeCheck = formattedTime.format(new Date()).split(":")[0];
  }

  function updateLocation(locationName, countryName) {
    locationHeading.innerHTML = `<u>${countryName}, ${locationName}</u><br><br>`;
    header.textContent = "";
  }

  function updateTemperature(temperatureC, temperatureF) {
    tempC.textContent = `${temperatureC}°C /`;
    tempF.textContent = `${temperatureF}°F 🌡`;

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

  function windSpeed(kph, mph) {
    windKph.textContent = `${kph} KPH`;
    windMph.textContent = `${mph} MPH 🍃`;

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

  function rainChanceBorder() {
    rainChance.innerHTML = "";
    rainChance.textContent = "Rain or Snow Chance";
    rainChance.style.borderBottom = "1px solid black";
  }

  function forecastIcons(today, tomorrow, afterTomorrow) {
    forecastDivMain.innerHTML = "";
    let iconToday = document.createElement("img");
    let iconTomorrow = document.createElement("img");
    let iconAfterTomorrow = document.createElement("img");
    iconToday.classList.add("weather-icons");
    iconTomorrow.classList.add("weather-icons");
    iconAfterTomorrow.classList.add("weather-icons");

    // Today's weather condition
    if (
      today === 1 &&
      (WEATHER.includes("cloud") ||
        WEATHER.includes("overcast") ||
        WEATHER.includes("rain") ||
        WEATHER.includes("patch") ||
        WEATHER.includes("mist"))
    ) {
      iconToday.src = "animated/rainy-5.svg";
      iconToday.alt = "Cloudy & Rainy";
    } else if (today === 1 && WEATHER.includes("thunder")) {
      iconToday.src = "animated/thunder.svg";
      iconToday.alt = "Thunder & Rainy";
    } else if (today === 1 && WEATHER.includes("sunny")) {
      iconToday.src = "animated/rainy-1.svg";
      iconToday.alt = "Sunny & Rainy";
    } else if (
      todaySnowChance === 1 &&
      (WEATHER.includes("snow") ||
        WEATHER.includes("sleet") ||
        WEATHER.includes("blizzard") ||
        WEATHER.includes("ice"))
    ) {
      iconToday.src = "animated/snowy-6.svg";
      iconToday.alt = "Snow";
    } else if (
      today === 0 &&
      (WEATHER.includes("clear") || WEATHER.includes("sunny"))
    ) {
      iconToday.src = "animated/day.svg";
      iconToday.alt = "Clear";
    } else if (today === 0 && WEATHER.includes("cloud")) {
      iconToday.src = "animated/cloudy.svg";
      iconToday.alt = "Cloud";
    } else if (
      today === 0 &&
      (WEATHER.includes("rain") || WEATHER.includes("patch"))
    ) {
      iconToday.src = "animated/rainy-4.svg";
      iconToday.alt = "Light Rain";
    } else {
      iconToday.src = "animated/day.svg";
      iconToday.alt = "Clear";
    }
    forecastDivMain.appendChild(iconToday);

    // Tomorrow's weather condition
    if (
      tomorrow === 1 &&
      (WEATHER.includes("cloud") ||
        WEATHER.includes("overcast") ||
        WEATHER.includes("rain") ||
        WEATHER.includes("patch") ||
        WEATHER.includes("mist"))
    ) {
      iconTomorrow.src = "animated/rainy-5.svg";
      iconTomorrow.alt = "Cloudy & Rainy";
    } else if (tomorrow === 1 && WEATHER.includes("thunder")) {
      iconTomorrow.src = "animated/thunder.svg";
      iconTomorrow.alt = "Thunder & Rainy";
    } else if (tomorrow === 1 && WEATHER.includes("sunny")) {
      iconTomorrow.src = "animated/rainy-1.svg";
      iconTomorrow.alt = "Sunny & Rainy";
    } else if (
      tomorrowSnowChance === 1 &&
      (WEATHER.includes("snow") ||
        WEATHER.includes("sleet") ||
        WEATHER.includes("blizzard") ||
        WEATHER.includes("ice"))
    ) {
      iconTomorrow.src = "animated/snowy-6.svg";
      iconTomorrow.alt = "Snow";
    } else if (
      tomorrow === 0 &&
      (WEATHER.includes("clear") || WEATHER.includes("sunny"))
    ) {
      iconTomorrow.src = "animated/day.svg";
      iconTomorrow.alt = "Clear";
    } else if (tomorrow === 0 && WEATHER.includes("cloud")) {
      iconTomorrow.src = "animated/cloudy.svg";
      iconTomorrow.alt = "Cloud";
    } else if (
      tomorrow === 0 &&
      (WEATHER.includes("rain") || WEATHER.includes("patch"))
    ) {
      iconTomorrow.src = "animated/rainy-4.svg";
      iconTomorrow.alt = "Light Rain";
    } else {
      iconTomorrow.src = "animated/day.svg";
      iconTomorrow.alt = "Clear";
    }
    forecastDivMain.appendChild(iconTomorrow);

    // After-tomorrow's weather condition
    if (
      afterTomorrow === 1 &&
      (WEATHER.includes("cloud") ||
        WEATHER.includes("overcast") ||
        WEATHER.includes("rain") ||
        WEATHER.includes("thunder") ||
        WEATHER.includes("patch") ||
        WEATHER.includes("mist"))
    ) {
      iconAfterTomorrow.src = "animated/rainy-5.svg";
      iconAfterTomorrow.alt = "Cloudy & Rainy";
    } else if (afterTomorrow === 1 && WEATHER.includes("thunder")) {
      iconAfterTomorrow.src = "animated/thunder.svg";
      iconAfterTomorrow.alt = "Thunder & Rainy";
    } else if (afterTomorrow === 1 && WEATHER.includes("sunny")) {
      iconAfterTomorrow.src = "animated/rainy-1.svg";
      iconAfterTomorrow.alt = "Sunny & Rainy";
    } else if (
      afterTomorrowSnowChance === 1 &&
      (WEATHER.includes("snow") ||
        WEATHER.includes("sleet") ||
        WEATHER.includes("blizzard") ||
        WEATHER.includes("ice"))
    ) {
      iconAfterTomorrow.src = "animated/snowy-6.svg";
      iconAfterTomorrow.alt = "Snow";
    } else if (
      afterTomorrow === 0 &&
      (WEATHER.includes("clear") || WEATHER.includes("Sunny"))
    ) {
      iconAfterTomorrow.src = "animated/day.svg";
      iconAfterTomorrow.alt = "Clear";
    } else if (afterTomorrow === 0 && WEATHER.includes("cloud")) {
      iconAfterTomorrow.src = "animated/cloudy.svg";
      iconAfterTomorrow.alt = "Cloud";
    } else if (
      today === 0 &&
      (WEATHER.includes("rain") || WEATHER.includes("patch"))
    ) {
      iconAfterTomorrow.src = "animated/rainy-4.svg";
      iconAfterTomorrow.alt = "Light Rain";
    } else {
      iconAfterTomorrow.src = "animated/day.svg";
      iconAfterTomorrow.alt = "Clear";
    }
    forecastDivMain.appendChild(iconAfterTomorrow);
    console.log(afterTomorrow, WEATHER);
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
});
