$(document).ready(function () {
  let currentSlide = 0;
  loadSavedCities();

  $("#weatherForm").on("submit", function (event) {
    event.preventDefault();
    const city = $("#cityInput").val();
    getWeather(city);
  });

  $("#getLocationButton").on("click", function () {
    getCurrentLocationWeather();
  });

  getCurrentLocationWeather();
});

function getWeather(city) {
  const apiKey = "b429d88ed86c4d4996a202219241307";
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
  $.ajax({
    url: apiUrl,
    method: "GET",
    success: function (data) {
      displayWeather(data);
      saveCity(city);
      updateCarousel();
    },
    error: function () {
      alert(
        "Nu s-au putut obține datele meteo. Vă rugăm să încercați din nou."
      );
    },
  });
}

function getWeatherByCoordinates(lat, lon) {
  const apiKey = "b429d88ed86c4d4996a202219241307";
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3`;
  $.ajax({
    url: apiUrl,
    method: "GET",
    success: function (data) {
      displayWeather(data);
      saveCity(data.location.name);
      updateCarousel();
    },
    error: function () {
      alert("Nu s-au putut obține datele meteo pentru locația curentă.");
    },
  });
}

function displayWeather(data) {
  $("#cityName").text(data.location.name);
  $("#weatherDescription img").attr("src", data.current.condition.icon);
  $("#weatherDescription span").text(data.current.condition.text);
  $("#temperature").text(`Temperatura: ${data.current.temp_c} °C`);
  $("#humidity").text(`Umiditate: ${data.current.humidity}%`);
  $("#wind").text(`Viteza vântului: ${data.current.wind_kph} kph`);
  $("#sunrise").text(`Răsărit: ${data.forecast.forecastday[0].astro.sunrise}`);
  $("#sunset").text(`Apus: ${data.forecast.forecastday[0].astro.sunset}`);

  let forecastHTML = "";
  data.forecast.forecastday.forEach((day) => {
    forecastHTML += `
      <div class="day">
        <h5>${day.date}</h5>
        <img src="${day.day.condition.icon}" alt="Weather Icon">
        <p>${day.day.condition.text}</p>
        <p>Max: ${day.day.maxtemp_c} °C</p>
        <p>Min: ${day.day.mintemp_c} °C</p>
        <p>Șanse de precipitații: ${day.day.daily_chance_of_rain}%</p>
        <p>Nivel UV: ${day.day.uv}</p>
      </div>
    `;
  });
  $("#forecast").html(forecastHTML);

  $("#weatherResult").addClass("active");
}

function nextSlide() {
  const totalSlides = $(".carousel .day").length;
  if (currentSlide < totalSlides - 2) {
    currentSlide += 2;
  }
  updateCarousel();
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide -= 2;
  }
  updateCarousel();
}

function updateCarousel() {
  const slideWidth = $(".carousel .day").outerWidth(true);
  const newTransform = -currentSlide * slideWidth;
  $(".carousel").css("transform", `translateX(${newTransform}px)`);
}

function saveCity(city) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    loadSavedCities();
  }
}

function loadSavedCities() {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  $("#cityList").empty();
  $("#cityListMobile").empty();
  cities.forEach((city) => {
    $("#cityList").append(`
      <button onclick="getWeather('${city}')">
        ${city}
        <span class="delete-icon" onclick="deleteCity(event, '${city}')">&times;</span>
      </button>
    `);
    $("#cityListMobile").append(`
      <button onclick="getWeather('${city}')">
        ${city}
        <span class="delete-icon" onclick="deleteCity(event, '${city}')">&times;</span>
      </button>
    `);
  });
}

function deleteCity(event, city) {
  event.stopPropagation();
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities = cities.filter((c) => c !== city);
  localStorage.setItem("cities", JSON.stringify(cities));
  loadSavedCities();
}

function clearSavedCities() {
  localStorage.removeItem("cities");
  loadSavedCities();
}

function toggleMenu() {
  $("#cityListMobile").toggleClass("d-none");
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoordinates(latitude, longitude);
      },
      () => {
        alert("Nu s-a putut obține locația curentă.");
      }
    );
  } else {
    alert("Geolocația nu este suportată de acest browser.");
  }
}
