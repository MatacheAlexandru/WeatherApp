const API_KEY = "b429d88ed86c4d4996a202219241307";
const BASE_URL = "https://api.weatherapi.com/v1";

let currentSlide = 0;

function getWeatherByCoordinates(lat, lon) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`;
  $.get(url, function (data) {
    console.log(data);
    updateWeather(data);
    updateCarousel(data.forecast.forecastday);
  }).fail(function () {
    alert("Nu s-au putut obține datele meteo. Vă rugăm să încercați din nou.");
  });
}

function getWeatherByCity(city) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;
  $.get(url, function (data) {
    console.log(data);
    updateWeather(data);
    updateCarousel(data.forecast.forecastday);
  }).fail(function () {
    alert("Nu s-au putut obține datele meteo. Vă rugăm să încercați din nou.");
  });
}

function updateWeather(data) {
  $("#weatherResult").html(`
        <h2>${data.location.name}</h2>
        <p>Temperatura: ${data.current.temp_c} °C</p>
        <p>Starea vremii: ${data.current.condition.text}</p>
        <p>Umiditate: ${data.current.humidity}%</p>
    `);
}

function updateCarousel(forecastDays) {
  const carousel = $("#carousel");
  carousel.html("");
  forecastDays.forEach((day, index) => {
    const slide = $(`
            <div class="carousel-slide" data-index="${index}">
                <h3>${day.date}</h3>
                <p>Max: ${day.day.maxtemp_c} °C</p>
                <p>Min: ${day.day.mintemp_c} °C</p>
                <p>${day.day.condition.text}</p>
            </div>
        `);
    carousel.append(slide);
  });
  showSlide(currentSlide);
}

function showSlide(index) {
  const slides = $(".carousel-slide");
  slides.hide();
  $(slides[index]).show();
}

function nextSlide() {
  const slides = $(".carousel-slide");
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  const slides = $(".carousel-slide");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

$("#weatherForm").on("submit", function (e) {
  e.preventDefault();
  const city = $("#cityInput").val();
  getWeatherByCity(city);
});

$("#currentLocationButton").on("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCoordinates(lat, lon);
    });
  } else {
    alert("Geolocația nu este suportată de acest browser.");
  }
});

$("#nextSlide").on("click", nextSlide);
$("#prevSlide").on("click", prevSlide);
