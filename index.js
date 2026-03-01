const TelegramBot = require('node-telegram-bot-api');
const token = '8636438139:AAFwUi_Dc6xDvAcZCdLVRt7SWQsVLGrRb6o';
const bot = new TelegramBot(token, { polling: true });
const miniAppUrl = 'https://vaniokk14-cyber.github.io/IKRU-MNE/';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "🐟 Добро пожаловать в IKRU MNE!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🛒 Магазин", url: miniAppUrl }],
        [{ text: "ℹ️ О нас", callback_data: 'about' }],
        [{ text: "💳 Оплата", callback_data: 'payment' }],
        [{ text: "🚚 Доставка", callback_data: 'delivery' }],
        [{ text: "📞 Контакты", callback_data: 'contacts' }]
      ]
    }
  });
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  }if (data === 'about') {
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