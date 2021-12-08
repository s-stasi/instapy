from threading import Lock
import os
class Singleton(type):
  _instances = {}
  _lock: Lock = Lock()
  
  def __call__(cls,*args, **kwargs):
    with cls._lock:
      if cls not in cls._instances:
        instance = super().__call__(*args, **kwargs)
        cls._instances[cls] = instance
    return cls._instances[cls]

class BotData(metaclass = Singleton):
	foundAccounts = []
	searchAccounts = []
  
	def __init__(self):
		print('c:\dev\instapy\data\\tags_and_accounts.txt')
		with open('c:\dev\instapy\data\\tags_and_accounts.txt') as file, open('c:\dev\instapy\data\\found_accounts.txt') as found:
    
			self.searchAccounts = []
			for line in file:
				self.searchAccounts.append(line)
			
			self.foundAccounts = []
			for line in found:
				self.foundAccounts.append(line)
    
	def getAccounts(self):
		return self.foundAccounts

	def addFound(self, element: str):
		if element not in self.foundAccounts:
			self.foundAccounts.append(element)
			print('found new account: {accountName}'.format(accountName = element))
   
   
	def makeDone(self, element: str):
		self.foundAccounts.remove(element)
  
	def save(self):
		with open('c:\dev\instapy\data\\found_accounts.txt', 'w+') as found:
			found.writelines(self.foundAccounts)
		pass