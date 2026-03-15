const TelegramBot = require('node-telegram-bot-api');

// токен
const token = 'ТВОЙ_ТОКЕН';

// канал заказов
const ordersChannel = https://t.me/+2W9uR566RkI0ZGU0;

// бот
const bot = new TelegramBot(token, { polling: true });

// ссылка магазина
const miniAppUrl = 'https://vaniokk14-cyber.github.io/IKRU-MNE/';

// команда start
bot.onText(/\/start/, (msg) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "🐟 Добро пожаловать в IKRU MNE!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🛒 Магазин", web_app: { url: miniAppUrl } }],
        [{ text: "ℹ️ О нас", callback_data: 'about' }],
        [{ text: "💳 Оплата", callback_data: 'payment' }],
        [{ text: "🚚 Доставка", callback_data: 'delivery' }],
        [{ text: "📞 Контакты", callback_data: 'contacts' }]
      ]
    }
  });

});

// кнопки меню
bot.on('callback_query', (query) => {

  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'about') {

    bot.sendMessage(chatId,
`🐟 IKRU MNE — морские деликатесы премиального качества 🇲🇪

Икра с насыщенным вкусом, отборная красная рыба, свежайшие морепродукты.

🌊 Натуральный вкус  
❄️ Свежесть  
✨ Премиум качество`
    );

  }

  if (data === 'payment') {

    bot.sendMessage(chatId,
"💳 Оплата при получении.\nВы оплачиваете заказ после проверки."
    );

  }

  if (data === 'delivery') {

    bot.sendMessage(chatId,
"🚚 Доставка по всей Черногории."
    );

  }

  if (data === 'contacts') {

    bot.sendMessage(chatId,
"📞 +382 69 575 828\nTelegram: @IKRAmne_bot"
    );

  }

});

// получение заказа из Mini App

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