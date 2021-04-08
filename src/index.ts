import Bot from './bot';
import BotData from './data';

(async () => {
  var bot = new Bot('my_agency_ita', 'FabioDodii123');
  await bot.open();
  await bot.doLogin();
  var data = new BotData('my_agency_ita', 'FabioDodii123');
  for(var i of data.getList()){
    console.log(i);
    await bot.searchUser(i);
    var list = await bot.getFollowedList();
    console.log(list);
    for (var el = 0; el =  list.length; el++) {
      console.log(list[el]);
      data.addFound(list[el]);
    }
    data.save();
  }
  
})()