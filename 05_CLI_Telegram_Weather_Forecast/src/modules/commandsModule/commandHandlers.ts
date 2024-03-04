import { getCityLocation, getForecast } from "../weatherModule/weatherforecast.js";
import { bot } from "../../bot.js";
const city = {};

function chooseCity(chatId, latitude, longitude) {
    if (!city[chatId]) {
        city[chatId] = {};
    }

    city[chatId].coordinates = {
        latitude: latitude,
        longitude: longitude,
    };
}

function getCity(chatId) {
    return city[chatId].coordinates;
}

const commands = new Map([
    ["/start", handleStart],
    ["Choose city", handleChooseCity],
    //["3 hours interval", chatId => handleFetchForecast(chatId, 3, false)],
    //["6 hours interval", chatId => handleFetchForecast(chatId, 6, false)],
    ["Enter city", handleEnterCityName],
    //["My location", handleLocation],
]);

function handleStart(chatId) {
    bot.sendMessage(
      chatId,
      "Welcome to the Weather Forecast Bot!\n" +
      {
        reply_markup: {
          keyboard: [[{ text: "/forecast" }, { text: "" }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      }
    );
}

function handleChooseCity(chatId) {
    bot.sendMessage(chatId, "Please choose a city:", {
      reply_markup: {
        keyboard: [
          [{ text: "Enter city name" }, { text: "Use my location" }],
          [{ text: "Go back to menu" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
}

async function handleEnterCityName(chatId) {
    const sentMessage = await bot.sendMessage(
      chatId,
      "Please enter the name of your city:",
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );
    const messageId = sentMessage.message_id;
    bot.onReplyToMessage(chatId, messageId, async (msg) => {
      const chatId = msg.chat.id;
      const cityName = msg.text.trim().toLowerCase();
      const coordinates = await getCityLocation(cityName);
      if (coordinates) {
        chooseCity(chatId, coordinates.lat, coordinates.lon);
        handleInterval(chatId);
      } else {
        bot.sendMessage(
          chatId,
          "Error, use geolocation."
        );
        chooseCity(chatId, null, null);
        handleForecast(chatId);
      }
    });
}
  function handleInterval(chatId) {
    bot.sendMessage(chatId, "Choose period", {
      reply_markup: {
        keyboard: [
          [{ text: "3 hours period" }, { text: "6 hours period" }],
          [{ text: "Go back to menu" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
}

async function handleFetchForecast(chatId, hours, wind) {
  try {
    const coordinates = getCity(chatId);
    if (!coordinates) {
      throw new Error("Coordinates not found.");
    }
    const forecast = await getForecast(
      coordinates.latitude,
      coordinates.longitude,
      hours,
    );
    if (!forecast) {
      throw new Error("Error.");
    }

    bot.sendMessage(chatId, forecast);
  } catch (error) {
    bot.sendMessage(
      chatId,
      "Error."
    );
  }
}

function handleForecast(chatId) {
    bot.sendMessage(chatId, "Select an option for the forecast", {
      reply_markup: {
        keyboard: [[{ text: "Set City" }, { text: "/lastcity" }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

export {commands};