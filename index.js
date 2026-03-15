const TelegramBot = require('node-telegram-bot-api');

// Твой токен (новый и безопасный)
const token = '8636438139:AAFZ-1KWSA34TFMpL27ZIK6H7gFia-S0e1s';

// Создание бота с опросом (polling)
const bot = new TelegramBot(token, { polling: true });

// Ссылка на миниапп магазин
const miniAppUrl = 'https://vaniokk14-cyber.github.io/IKRU-MNE/';

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "🐟 Добро пожаловать в IKRU MNE!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🛒 Магазин", web_app: { url: miniAppUrl } }]
        [{ text: "ℹ️ О нас", callback_data: 'about' }],
        [{ text: "💳 Оплата", callback_data: 'payment' }],
        [{ text: "🚚 Доставка", callback_data: 'delivery' }],
        [{ text: "📞 Контакты", callback_data: 'contacts' }]
      ]
    }
  });
});

// Обработка нажатий на кнопки
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'about') {
    bot.sendMessage(chatId, 
`🐟 IKRU MNE — морские деликатесы премиального качества 🇲🇪

Икра с насыщенным вкусом, отборная красная рыба, свежайшие морепродукты — всё, что превращает обычный ужин в гастрономическое удовольствие.

🌊 Натуральный вкус  
❄️ Свежесть, сохранённая идеально  
✨ Только отборный продукт

Мы работаем для тех, кто ценит качество и настоящий вкус.

Для заказа: @ikraMonte`
    );
  } else if (data === 'payment') {
    bot.sendMessage(chatId, "💳 Оплата производится только при получении заказа наличными.\n\nВы оплачиваете товар после проверки качества при доставке.");
  } else if (data === 'delivery') {
    bot.sendMessage(chatId, "🚚 Доставка по всей Черногории.");
  } else if (data === 'contacts') {
    bot.sendMessage(chatId, "📞 +382 69 575 828\nTelegram: @IKRAmne_bot\nГруппа: https://t.me/ikru_mne");
  }
});
// Получение заказов из Mini App
bot.on('message', (msg) => {

  if (msg.web_app_data) {

    const order = msg.web_app_data.data;

    bot.sendMessage(msg.chat.id, "📦 Новый заказ:\n\n" + order);

  }

});
bot.on('message', (msg) => {

  if (msg.web_app_data) {

    const order = decodeURIComponent(msg.web_app_data.data);

    const now = new Date();

    const time =
      now.getDate().toString().padStart(2,'0') + "." +
      (now.getMonth()+1).toString().padStart(2,'0') + "." +
      now.getFullYear() + " " +
      now.getHours().toString().padStart(2,'0') + ":" +
      now.getMinutes().toString().padStart(2,'0');

    const receipt =
`📦 <b>НОВЫЙ ЗАКАЗ</b>

${order}

🕒 ${time}`;

    bot.sendMessage(ordersChannel, receipt, { parse_mode: "HTML" });

    bot.sendMessage(msg.chat.id, "✅ Заказ отправлен! Мы скоро свяжемся с вами.");

  }

});