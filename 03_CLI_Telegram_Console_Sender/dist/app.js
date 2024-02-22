import TelegramBot from 'node-telegram-bot-api';
import { Command } from 'commander';
const program = new Command();
const token = 'token';
const chatId = 'chatId';
const bot = new TelegramBot(token, { polling: true });
program
    .command("m <message...>")
    .description("Send a message to the bot")
    .action((message) => {
    const fullMessage = message.join(' ');
    bot.sendMessage(chatId, fullMessage)
        .then(() => {
        console.log('Message sent successfully');
        process.exit(0);
    });
});
program
    .command("p <path...>")
    .description("Send photo to a bot")
    .action((pathInput) => {
    const path = pathInput.join(' ');
    bot.sendPhoto(chatId, path)
        .then(() => {
        console.log('Photo sent');
        process.exit(0);
    });
});
program.parse(process.argv);
//# sourceMappingURL=app.js.map