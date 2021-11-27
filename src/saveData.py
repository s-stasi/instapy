import json
import pathlib

class BotData:

	def __init__(self):
		with open(str(pathlib.Path().parent.parent.absolute()) + '\\data\\found_accounts.json', 'r+') as found_accounts_file:
			self.found = json.load(found_accounts_file)

		with open(str(pathlib.Path().parent.parent.absolute()) + '\\data\\tags_and_accounts.json', 'r+') as search_keywords:
			self.search = json.load(search_keywords)

	def addFound(self, account):
		self.__appendToFile(account)

	def __appendToFile(self, username):
		ww = open(str(pathlib.Path().parent.parent.absolute()) + '\\data\\found_accounts.json', 'w')
		if username not in self.found["accounts"]:
			self.found["accounts"].append(username)
			ww.seek(0)
			json.dump(self.found, ww)

	def saveToFile(self, fstream):
		# json.dump(self.data, self.found_accounts_file)
		pass

	def makeDone(self, username):
		self.found["done"].append(username)
		self.found["accounts"].remove(username)

	def getTags(self):
		return self.search["tags"]

	def getAccList(self):
		return 0

	def getAccounts(self):
		# print(self.search["accounts"])
		return self.found["accounts"]