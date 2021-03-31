from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from getpass import getpass
from saveData import BotData
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
import time

class Bot:
	PATH = './src/chromedriver.exe'
	url = 'https://instagram.com'
	custom_url = 'https://www.instagram.com/{username}/'
	data: BotData
	totalFound = 0

	def __init__(self, username: str, password: str, data: BotData):
		print('initialize bot')
		self.username = username
		self.password = password
		self.data  = data
		self.exec_time = time.time()

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

	def goToDirect(self):
		self.driver.get("https://www.instagram.com/direct/inbox")
		self.driver.find_element_by_xpath("//body/div[4]/div/div/div/div[3]/button[2]").click()
		self.driver.find_element_by_xpath("//body").click()
		self.driver.find_element_by_xpath("//*[@id='react-root']/section/div[1]/header/div[1]/div[2]/button").click()

	def sendMessage(self, username: str, message: str):
		lclock = time.time()
		search_box = self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[2]/div[1]/div[1]/div[1]/div[2]/input[1]")
		search_box.click()
		search_box.send_keys(username)
		time.sleep(2.5)
		# click profile
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/button[1]").click()
		
		# click "avanti"
		WebBrowserWait(self.driver, 5).until(EC.element_to_be_clickable(By.XPATH, "//*[@id='react-root']/section[1]/div[1]/header/div/div[2]/button"))
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[1]/header/div/div[2]/button").click()

		self.exec_time = (time.time() - self.start_time)/60
		if self.exec_time % 20 == 0: time.sleep(60)
		if self.exec_time % 120 == 0: time.sleep(60 * 17)
		else: time.sleep(random.uniform(4.0, 7.5))
		# click textarea
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/textarea[1]").click()

		if message != "":
			self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/textarea[1]").send_keys(message)
			self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/button[1]").click()
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[1]/header[1]/div[1]/div[1]").click()

		self.data.makeDone(username)
		time.sleep(0.5)
		print('This user took about: ' + (time.time() - lclock))

	def scrollDown(self):
		last_height = self.driver.execute_script("return document.body.scrollHeight")

		while True:
				# Scroll down to bottom
				self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

				# Wait to load page
				time.sleep(2)

				# Calculate new scroll height and compare with last scroll height
				new_height = self.driver.execute_script("return document.body.scrollHeight")
				if new_height == last_height:
					break
				last_height = new_height

	def searchHashtag(self, hashtag: str):
		custom_url = self.url + '/explore/tags/{tag}'
		custom_url = custom_url.format(tag = hashtag)
		self.driver.get(custom_url)

	def searchUser(self, username: str):
		custom_url = self.custom_url.format(username = username)
		self.driver.get(custom_url)

	def addFollowedToList(self):
		# click "seguiti"
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/main[1]/div[1]/ul[1]/li[3]/a[1]/span[1]").click()
		# add account to list

		self.scrollDown()

		WebDriverWait(self.driver, 10).until(expected_conditions.visibility_of_element_located((By.CSS_SELECTOR, 'a.notranslate')))
		list_of_elements = self.driver.find_elements_by_css_selector('a.notranslate')
		print(list_of_elements)
		for i in list_of_elements:
			self.totalFound += 1
			print (i.text)
			self.data.addFound(i.text)

		print('found {count} new accounts'.format(count = self.totalFound))

	def addFollowersToList(self):
		# click "seguiti"
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/main[1]/div[1]/ul[1]/li[2]/a[1]/span[1]").click()
		# add account to list

		self.scrollDown()

		WebDriverWait(self.driver, 10).until(expected_conditions.visibility_of_element_located((By.CSS_SELECTOR, 'a.notranslate')))
		list_of_elements = self.driver.find_elements_by_css_selector('a.notranslate')
		print(list_of_elements)
		for i in list_of_elements:
			self.totalFound += 1
			print (i.text)
			self.data.addFound(i.text)

		print('found {count} new accounts'.format(count = self.totalFound))


	def close(self):
		self.driver.close()