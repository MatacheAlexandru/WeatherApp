const express = require("express");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname)));

// Servește fișierele din node_modules
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Ruta pentru pagina principală
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  console.log("Serving file:", filePath);
  res.sendFile(filePath);
});

// Ruta pentru obținerea datelor meteo
app.get("/weather", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    let apiUrl;
    if (city) {
      apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3`;
    } else if (lat && lon) {
      apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lon}&days=3`;
    } else {
      return res
        .status(400)
        .json({ error: "City or coordinates must be provided" });
    }

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Nu s-au putut obține datele meteo" });
  }
});

app.listen(PORT, () => {
  console.log(`Serverul rulează la http://localhost:${PORT}`);
});
