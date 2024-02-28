import TelegramBot from "node-telegram-bot-api";
import { getForecast } from "./modules/weatherModule/weatherforecast.js";
import * as dotenv from 'dotenv';
dotenv.config();
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
export const setupBotListeners = (bot) => {
    const chatStates = {};
    const setUserState = (userId, state) => {
        chatStates[userId] = state;
    };
    const getUserState = (userId) => {
        return chatStates[userId] || { state: "" };
    };
    const stateHandlers = {
        awaiting_option: async (msg, option) => {
            const chatId = msg.chat.id;
            setUserState(chatId, { state: "awaiting_city", option: +option });
            bot.sendMessage(chatId, `You chose ${option} hour interval. Now enter the city:`);
        },
        awaiting_city: async (msg) => {
            const chatId = msg.chat.id;
            const city = msg.text || "";
            const userState = getUserState(chatId);
            const option = userState.option || 3;
            bot.sendMessage(chatId, await getForecast(city, option));
            setUserState(chatId, { state: "" });
        },
    };
    const mainMenuKeyboard = {
        reply_markup: {
            keyboard: [[{ text: "/Currency" }, { text: "/Weather" }]],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    };
    const weatherForecastOptions = {
        reply_markup: {
            keyboard: [
                [{ text: "Every 3 hours" }, { text: "Every 3 hours" }],
                [{ text: "Previous menu" }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    };
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Menu", mainMenuKeyboard);
    });
    bot.onText(/\/Weather/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Choose an interval:", weatherForecastOptions);
    });
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text || "";
        if (!msg.text)
            return;
        const userState = getUserState(msg.chat.id);
        if (userState.state) {
            const handler = stateHandlers[userState.state];
            if (handler) {
                await handler(msg);
                bot.sendMessage(chatId, "Choose an option", mainMenuKeyboard);
                return;
            }
        }
        switch (text) {
            case "/start":
                break;
            case "/Weather":
                break;
            case "Every 3 hours":
                await stateHandlers["awaiting_option"](msg, 3);
                break;
            case "Every 6 hours":
                await stateHandlers["awaiting_option"](msg, 6);
                break;
            case "Previous menu":
                bot.sendMessage(chatId, "Menu", mainMenuKeyboard);
                break;
            default:
                bot.sendMessage(chatId, "Command not found, try again", mainMenuKeyboard);
                break;
        }
    });
};
//# sourceMappingURL=bot.js.map