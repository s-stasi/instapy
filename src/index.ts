import Bot from './bot';

(async () => {const bot = new Bot('cricetonzi', 'S4muele2002');
  await bot.open();
  await bot.doLogin();
  await bot.goToDirect();
})()