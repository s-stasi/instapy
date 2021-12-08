from bot import Bot
from threading import Thread
from saveData import BotData

def makeList():
  bot = Bot()
  bot.addFollowedToList()


def sendMessages():
  message='placeholder'
  bot = Bot()
  bot.sendMessages(delay=1, message=message)
  
makeListThread = Thread(target = makeList)
makeListThread.start()