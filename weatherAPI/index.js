// Based on DEMO Weather API of Google
// Uses latitude and longitude coordinates

document.addEventListener("DOMContentLoaded", () => {
  const weatherForm = document.querySelector(".weatherForm");
  const cityInput = document.querySelector(".cityInput");
  const card = document.querySelector(".card");

  //Get DEMO Google Weather API Key at https://mapsplatform.google.com/maps-products/weather
  const apiKey = "change to API key";

  weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const input = cityInput.value.trim();
    const parts = input.split(",");

    if (parts.length !== 2) {
      displayError("Enter coordinates like: 15.1450, 120.5887");
      return;
    }

    const latitude = parseFloat(parts[0].trim());
    const longitude = parseFloat(parts[1].trim());

    if (isNaN(latitude) || isNaN(longitude)) {
      displayError("Invalid coordinates");
      return;
    }

    try {
      const weatherData = await getWeatherData(latitude, longitude);
      displayWeatherInfo(weatherData, input);
    } catch (error) {
      console.error(error);
      displayError(error.message);
    }
  });

  async function getWeatherData(latitude, longitude) {
    const apiUrl = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${apiKey}&location.latitude=${latitude}&location.longitude=${longitude}&unitsSystem=METRIC`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Could not fetch weather data.");
    }

    return await response.json();
  }

  function displayWeatherInfo(data, locationText) {
    console.log(data);

    const { temperature, relativeHumidity, weatherCondition } = data;

    card.textContent = "";
    card.style.display = "block";
    updateCardBackground(weatherCondition.type, data.isDaytime);

    const cityDisplay = document.createElement("h1");
    const weatherIcon = document.createElement("img");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");

    cityDisplay.textContent = locationText;
    cityDisplay.classList.add("cityDisplay");

    tempDisplay.textContent = `${temperature?.degrees ?? "--"}°${temperature?.unit === "CELSIUS" ? "C" : ""}`;
    tempDisplay.classList.add("tempDisplay");

    humidityDisplay.textContent = `Humidity: ${relativeHumidity ?? "--"}%`;
    humidityDisplay.classList.add("humidityDisplay");

    descDisplay.textContent =
      weatherCondition?.description?.text ||
      weatherCondition?.type ||
      "No weather description";
    descDisplay.classList.add("descDisplay");

    weatherIcon.src = weatherCondition.iconBaseUri + ".png";
    weatherIcon.alt = "weather icon";

    if (!data.isDaytime) {
      weatherIcon.style.filter =
        "brightness(0.8) drop-shadow(0 0 10px rgba(255,255,255,0.2))";
    }

    card.appendChild(cityDisplay);
    card.appendChild(weatherIcon);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
  }

  function updateCardBackground(type, isDaytime) {
    let bg = "";

    switch (type) {
      case "CLEAR":
      case "MOSTLY_CLEAR":
        bg = isDaytime
          ? "linear-gradient(135deg, #fceabb, #f8b500)"
          : "linear-gradient(135deg, #141e30, #243b55)";
        break;

      case "PARTLY_CLOUDY":
        bg = isDaytime
          ? "linear-gradient(135deg, #dfe9f3, #ffffff)"
          : "linear-gradient(135deg, #232526, #414345)";
        break;

      case "CLOUDY":
      case "MOSTLY_CLOUDY":
        bg = isDaytime
          ? "linear-gradient(135deg, #bdc3c7, #2c3e50)"
          : "linear-gradient(135deg, #1c1c1c, #434343)";
        break;

      case "RAIN":
      case "LIGHT_RAIN":
      case "HEAVY_RAIN":
      case "DRIZZLE":
        bg = isDaytime
          ? "linear-gradient(135deg, #4b79a1, #283e51)"
          : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
        break;

      case "THUNDERSTORM":
        bg = isDaytime
          ? "linear-gradient(135deg, #373b44, #4286f4)"
          : "linear-gradient(135deg, #0f2027, #000000)";
        break;

      case "SNOW":
        bg = isDaytime
          ? "linear-gradient(135deg, #e6dada, #274046)"
          : "linear-gradient(135deg, #1e3c72, #2a5298)";
        break;

      case "FOG":
        bg = isDaytime
          ? "linear-gradient(135deg, #cfd9df, #e2ebf0)"
          : "linear-gradient(135deg, #3a3a3a, #181818)";
        break;

      case "WINDY":
        bg = isDaytime
          ? "linear-gradient(135deg, #89f7fe, #66a6ff)"
          : "linear-gradient(135deg, #1e3c72, #2a5298)";
        break;

      default:
        bg = isDaytime
          ? "linear-gradient(135deg, #bdc3c7, #2c3e50)"
          : "linear-gradient(135deg, #0f2027, #2c5364)";
    }

    card.style.background = bg;
    card.style.color = "#fff";
  }

  function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "block";
    card.style.background = "none";
    card.style.border = "none";
    card.style.boxShadow = "none";
    card.appendChild(errorDisplay);
  }
});
