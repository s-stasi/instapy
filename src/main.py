from bot import Bot
from saveData import BotData

'''
TODO:
login to instagram 
go to profiles profile
click to message 
send messages from file
'''
data = BotData()
bot = Bot('cricetonzi', 'S4muele2002', data)
bot.open()
bot.doLogin()
bot.searchUser('tatuaggi_ita_')
bot.addFollowedToList()
bot.close()