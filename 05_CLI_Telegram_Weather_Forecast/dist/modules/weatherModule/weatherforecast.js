import axios from "axios";
export const getForecast = async (city, step) => {
    try {
        const weatherForecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.Weather_Api_Key}=${city}&lang=ua&units=metric`);
        const forecasts = weatherForecast.data.list;
        let output = `Weather in ${city} with an ${step} hr period.\n`;
        let currentDate = "";
        const filteredForecasts = forecasts.filter((e, i) => {
            const date = new Date(e.dt * 1000);
            return step === 3
                ? new Date().getTime() < date.getTime()
                : date.getUTCHours() % step === 0 &&
                    new Date().getTime() < date.getTime();
        });
        filteredForecasts.forEach((item) => {
            const dateTime = new Date(item.dt * 1000);
            const date = dateTime.toLocaleDateString("uk-UA", {
                weekday: "long",
                month: "short",
                day: "numeric",
            });
            const time = dateTime.toLocaleTimeString("uk-UA", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            if (currentDate !== date) {
                if (currentDate !== "")
                    output += "\n";
                output += `${date}:\n`;
                currentDate = date;
            }
            const temp = item.main.temp.toFixed(1);
            const feelsLike = item.main.feels_like.toFixed(1);
            const weather = item.weather[0].description;
            output += `    ${time}, ${temp}°C, Feels like ${feelsLike}°C, ${weather}\n`;
        });
        return output;
    }
    catch (error) {
        console.error("Error fetching weather forecast:", error);
        return "Error fetching weather forecast";
    }
};
//# sourceMappingURL=weatherforecast.js.map