import TelegramBot from "node-telegram-bot-api";
import axios from "axios";


const token = "7089212699:AAG7RCSpFgNF3pRgbXwrhWsD2NAYcERYH4k";

const bot = new TelegramBot(token, {polling: true});

async function getPhoto() {
    const response = await axios.get('https://picsum.photos/200/300', {
        responseType: 'arraybuffer'
    });
    return response.headers.location;
}
bot.on('message', async (msg)=> {
    const chatId = msg.chat.id;
    const messageReceived = msg.text;

    console.log(`Message received from ${msg.from.first_name}: ${messageReceived}`);

    if (messageReceived.toLowerCase() === 'photo') {
          const response = await axios.get('https://picsum.photos/200/300', {
            responseType: 'arraybuffer'
        });
        const photoUrl = Buffer.from(response.data, "binary");
        bot.sendPhoto(chatId, photoUrl);
      } else {
        await bot.sendMessage(chatId, `You said: ${msg.text}`);
      }
});