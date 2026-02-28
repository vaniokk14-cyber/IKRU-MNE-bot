const TelegramBot = require('node-telegram-bot-api');

// Вставь сюда свой новый токен
const token = '8636438139:AAEWf5fVSXkSsTp794Hi11Sx0S-ZOajRoK8';

const bot = new TelegramBot(token, { polling: true });

// Ссылка на твой MiniApp
const miniAppUrl = 'https://vaniokk14-cyber.github.io/IKRU-MNE/';

// Приветствие при /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = `🐟 Добро пожаловать в IKRU MNE!\nСвежая рыба и икра в Черногории 🇲🇪`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🛒 Магазин", url: miniAppUrl }],
        [{ text: "ℹ️ О нас", callback_data: 'about' }],
        [{ text: "💳 Оплата", callback_data: 'payment' }],
        [{ text: "🚚 Доставка", callback_data: 'delivery' }],
        [{ text: "📞 Контакты", callback_data: 'contacts' }]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

// Обработка кнопок "О нас", "Оплата", "Доставка", "Контакты"
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'about') {
    bot.sendMessage(chatId, `Мы несколько лет поставляем рыбу и морепродукты, предоставляя широкий выбор деликатесов.\n\nАссортимент тщательно отбирается с учетом качества и ваших пожеланий.`);
  } else if (data === 'payment') {
    bot.sendMessage(chatId, `💳 Оплата производится наличными при доставке или онлайн переводом на карту.`);
  } else if (data === 'delivery') {
    bot.sendMessage(chatId, `🚚 Доставка по всей Черногории. Мы гарантируем свежесть и точное соблюдение сроков.`);
  } else if (data === 'contacts') {
    bot.sendMessage(chatId, `📞 Связь: +382 69 575 828\nTelegram: @IKRAmne_bot\nГруппа: https://t.me/ikru_mne`);
  }
});
