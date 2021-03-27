from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from getpass import getpass
from saveData import BotData
import time

class Bot:
	PATH = './src/chromedriver.exe'
	url = 'https://instagram.com'
	custom_url = 'https://www.instagram.com/{reciever}/'
	data = BotData()

	def __init__(self, username: str, password: str):
		self.username = username
		self.password = password

	def open(self):
		mobile_emulation = { "deviceName": "Nexus 5" }
		chrome_options = webdriver.ChromeOptions()
		chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)
		self.driver = webdriver.Chrome(self.PATH, options=chrome_options)
		self.driver.get(self.url)
		time.sleep(1)

	def __handleNotificationRequest(self):
		try:
			not_now_btn = driver.find_element_by_xpath('/html/body/div[4]/div/div/div[3]/button[2]')
			not_now_btn.click()
			print('not now')
		except:
			pass

	def __clickLoginButton(self):
		try:
			self.driver.find_element_by_xpath("//body/div[2]/div[1]/div[1]/div[1]/div[2]/button[1]").click()
		except:
			pass

		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/main[1]/article[1]/div[1]/div[1]/div[1]/div[2]/button[1]").click()

	def doLogin(self):
		self.__clickLoginButton()
		USERNAME = self.driver.find_element_by_name('username').send_keys(self.username)
		PASSWORD = self.driver.find_element_by_name('password').send_keys(self.password)

		login_btn = self.driver.find_element_by_xpath("//*[@id='loginForm']/div[1]/div[6]/button[1]").click()
		time.sleep(5)
		self.driver.get(self.url)
		self.__handleNotificationRequest()

	def goToProfileSendMessage(self, profile: str, message: str):
		self.reciever_url = self.custom_url.format(reciever = profile)
		self.driver.get("https://www.instagram.com/direct/inbox")
		self.driver.find_element_by_xpath("//body/div[4]/div/div/div/div[3]/button[2]").click()
		self.driver.find_element_by_xpath("//body").click()
		self.driver.find_element_by_xpath("//*[@id='react-root']/section/div[1]/header/div[1]/div[2]/button").click()

		search_box = self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[2]/div[1]/div[1]/div[1]/div[2]/input[1]")
		search_box.click()
		search_box.send_keys(profile)
		time.sleep(1)
		# click profile
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/button[1]").click()
		time.sleep(1)
		# click "avanti"
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[1]/header/div/div[2]/button").click()
		time.sleep(0.7)
		# click textarea
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/textarea[1]").click()

		if message != "":
			self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/textarea[1]").send_keys(message)
			self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/button[1]").click()

	def searchHashtag(self, hashtag: str):
		custom_url = self.url + '/explore/tags/{tag}'
		custom_url = custom_url.format(tag = hashtag)
		self.driver.get(custom_url)

