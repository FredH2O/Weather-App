const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public")); // Serve static files from 'public' directory

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send("City is required");
  }

  try {
    const response = await axios.get(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(
        city
      )}`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching weather data");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
