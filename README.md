# Weather App

This is a simple and user-friendly weather app that allows users to check the current weather conditions for any location worldwide. The app is built using basic web technologies: HTML, CSS, and JavaScript. It utilizes external APIs to fetch real-time weather data and display it with visually appealing, animated SVG icons.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [APIs and Data Sources](#apis-and-data-sources)
- [Credits](#credits)
- [License](#license)

## Features

- **Current Weather Display**: Provides real-time weather data including temperature, humidity, wind speed, and more.
- **Animated Icons**: Displays weather conditions using sleek, animated SVG icons that visually represent the current weather.
- **Search Functionality**: Allows users to search for weather in any city or location globally.
- **Responsive Design**: The app is designed to be responsive, ensuring it works well on both desktop and mobile devices.

## Technologies Used

- **HTML**: The app's structure is created using HTML, providing the basic layout and elements.
- **CSS**: Styling and layout are managed with CSS, ensuring a clean and modern look across different devices.
- **JavaScript**: Handles the app's functionality, including fetching data from external APIs and updating the UI dynamically.
- **SVG Weather Icons**: Icons are sourced from [amCharts](https://www.amcharts.com/free-animated-svg-weather-icons/), offering animated representations of different weather conditions.
- **WeatherAPI**: Real-time weather data is retrieved from WeatherAPI.
- **RapidAPI**: RapidAPI serves as a gateway to access the WeatherAPI and manage API requests efficiently.

## Installation

To run this weather app locally on your machine, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/FredH2O/Weather-App.git
   ```
2. **Navigate to the Project Directory**:

   ```bash
   cd Weather-App
   ```

3. **Open the `index.html` File**:
   - You can directly open the `index.html` file in your preferred web browser.
   - Alternatively, you can use a local server setup if you prefer (e.g., using VSCode Live Server or Python's SimpleHTTPServer).

## Usage

1. **Launch the App**:

   - Open the app in your browser by loading the `index.html` file.

2. **Search for a Location**:

   - Use the search bar at the top of the app to enter the name of any city or location.
   - Press "Enter" or click the search button to fetch and display the current weather data for the entered location.

3. **View Weather Details**:
   - The app will display key weather details such as temperature, humidity, wind speed, and more.
   - Weather conditions are visually represented by animated SVG icons that change based on the current weather.

## APIs and Data Sources

This app relies on external APIs to fetch weather data:

- **WeatherAPI**: Provides accurate and up-to-date weather information including temperature, humidity, wind speed, and weather conditions.
- **RapidAPI**: Acts as an intermediary, allowing easy access to WeatherAPI and managing API requests.

To use this app, you may need to configure your own API keys from RapidAPI and WeatherAPI (if not already configured in the code).

## Credits

- **Weather Icons**: Animated SVG weather icons are provided by [amCharts](https://www.amcharts.com/free-animated-svg-weather-icons/).
- **Weather Data**: Weather information is sourced from [WeatherAPI](https://www.weatherapi.com/).
- **API Management**: API requests are handled via [RapidAPI](https://rapidapi.com/).

## License

This project is open source and is made available under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as long as you include proper attribution.
