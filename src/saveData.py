import json

class BotData:

	def __init__(self):
		self.found_accounts_file = open('./data/found_accounts.json', 'r+')
		self.found = json.load(self.found_accounts_file)

		with open('./data/tags_and_accounts.json', 'r+') as search_keywords:
			self.search = json.load(search_keywords)

	def addFound(self, account):
		self.__appendToFile(account)

	def __appendToFile(self, account):
		self.found["accounts"].append(account)
		self.found_accounts_file.seek(0)
		json.dump(self.found, self.found_accounts_file)

	def saveToFile(self):
		json.dump(self.data, self.file)

	def getAccounts(self):
		# print(self.search["accounts"])
		return self.search["accounts"]
			