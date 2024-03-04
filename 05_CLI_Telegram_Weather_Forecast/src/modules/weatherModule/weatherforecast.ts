
import axios from "axios"

const apiKey = process.env.Weather_Api_Key;

export async function getCityLocation(city) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  
  const response = await axios.get(url);
  const cityData = response.data[0];

  return { lat: cityData.lat, lon: cityData.lon };
}

export async function getForecast(latitude, longitude, interval) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  const response = await axios.get(apiUrl);
  const forecastData = response.data;

  const cityName = forecastData.city.name;
  let formattedForecast = `Weather in ${cityName}: `;
  let currentDate = "";

  forecastData.list.forEach((item) => {
    
    const temperature = item.main.temp.toFixed(1);
    const feelsLike = item.main.feels_like.toFixed(1);
    const weatherDescription = item.weather[0].description;
    const dateTime = new Date(item.dt_txt);
    const hour = dateTime.getHours();
    const date = dateTime.toISOString().split("T")[0];
    const time = dateTime.toTimeString().split(" ")[0].substring(0, 5);
    

    if (hour % interval === 0) {
      if (currentDate !== date) {
        if (formattedForecast !== "") {
          formattedForecast += "\n\n";
        }
        formattedForecast += `${date.split("-").reverse().join(".")}:`;
        currentDate = date;
      }
        formattedForecast += `\n${time}: ${temperature}°C, Feels like: ${feelsLike}°C, ${
          weatherDescription.charAt(0).toUpperCase() +
          weatherDescription.slice(1)
        }`;
    }
  });
  return formattedForecast;
}