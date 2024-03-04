import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import * as dotenv from 'dotenv';
import { commands } from "./modules/commandsModule/commandHandlers.js";
import express from "express";
dotenv.config();

const app = express();
const token = process.env.TELEGRAM_BOT_TOKEN;
const port = process.env. PORT || 5000;
let bot;

bot = new TelegramBot(token);
bot.setWebHook(`${process.env.HEROKU_URL}/bot${bot.token}`);

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Bot is up and running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function handleMessage(chatId) {
    bot.sendMessage(chatId, "Invalid command. Please choose a valid option.");
  }
  
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    if (msg.text) {
      const messageText = msg.text.toLowerCase();
      const handler = commands.get(messageText);
  
      if (handler) {
        handler(chatId);
      } else if (!msg.reply_to_message) {
        handleMessage(chatId);
      }
    }
  });

export {bot};