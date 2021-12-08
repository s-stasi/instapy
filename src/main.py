from bot import Bot
from threading import Thread
from saveData import BotData

def makeList():
  bot = Bot()
  bot.addFollowedToList()


def sendMessages():
  bot = Bot('cricetonzi', 'samuele222002')
  data = BotData()
  for i in data.getAccounts():
    bot.sendMessage(i, "")
  
makeListThread = Thread(target = makeList)
makeListThread.start()
  