import json
import sqlite3

class BotData:
	conn = sqlite3.connect('data/database.db')
	cur = cinn.cursor()

	def __init__(self):
		self.found_accounts = open('./data/found_accounts.json', 'w')
		with open('./data/tags_and_accounts.json', 'r') as search_keywords:
			self.search = json.load(search_keywords)

		self.found = {
			"people": []
		}

	def addAccount(self, account):
		self.data["people"].append(account)

	def saveToFile(self):
		json.dump(self.data, self.file)

	def getAccounts(self):
		print(self.search["accounts"])
		return self.search["accounts"]
			