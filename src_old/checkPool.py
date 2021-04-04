from concurrent.futures import ThreadPoolExecutor
import time
import random
from .bot import Bot

class CheckPool(object):
	executor = ThreadPoolExecutor(max_workers = 5)
	resultPool = []
	credentials = []

	def __init__(self, username, password):
		credentials = [username, password]

	def addToPool(self, namesList):
		for i in namesList:
			self.resultPool.append(self.executor.submit(self.check, i))
			
	def check(self, username):
		bot = Bot(self.credentials[0], self.credentials[1], none)
		bot.open()
		bot.doLogin()
		bot.goToUser(username)
		print(bot.getFollowersNumber())
