from bot import Bot
from threading import Thread
from saveData import BotData

bot = Bot()

def makeList():
  bot.addFollowedToList()


def sendMessages():
  message='placeholder'
  bot.sendMessages(delay=1, message=message)
  
makeListThread = Thread(target = makeList)
makeListThread.start()

# sendDmThread = Thread(target = sendMessages)
# sendDmThread.start()