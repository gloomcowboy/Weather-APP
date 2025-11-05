const form = document.getElementById("weatherForm");
const content = document.getElementById("weatherContent");
const API_KEY = "YOUR_API_KEY_HERE";

// retrieve the city 
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value.trim();
  content.innerHTML = "<p>Loading...</p>";

  //fetch weather info
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (res.ok) {
      const bg = getBackground(data.weather[0].main);
      document.querySelector(".content").style.backgroundImage = `url(${bg})`;
      content.innerHTML = `
        <h2>${data.name}</h2>
        <p>☀️ ${data.main.temp}°C</p>
        <p>☁️ ${data.weather[0].description}</p>
        <p>🌬️ ${data.wind.speed} m/s</p>
        <p>💧 ${data.main.humidity}%</p>
      `;
      // Handle errors, e.g., invalid city name
    } else {
      content.innerHTML = `<p>Error: ${data.message}</p>`;
    }
  } catch (err) {
    content.innerHTML = `<p>An error occurred: ${err.message}</p>`;
  }
});

// Helper Function for background image
function getBackground(condition) {
  switch (condition.toLowerCase()) {
    case "clear": return "public/images/assets/clear.jpg";
    case "clouds": return "public/images/assets/cloudy.jpeg";
    case "rain": return "public/images/assets/rainy.jpeg";
    case "thunderstorm": return "public/images/assets/thunderstorm.jpg";
    case "snow": return "public/images/assets/snowy.jpg";
    case "mist":
    case "smoke":
    case "haze":
    case "fog": return "public/images/assets/foggy.jpg";
    default: return "public/images/assets/default.jpeg";
  }
}
