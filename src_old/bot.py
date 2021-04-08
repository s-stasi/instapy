from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from getpass import getpass
from saveData import BotData
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
import time
from conditions import condition
import random
from explicit import waiter, XPATH

class Bot:
	PATH = './bin/chromedriverdev.exe'
	url = 'https://instagram.com'
	custom_url = 'https://www.instagram.com/{username}/'
	data: BotData
	totalFound = 0

	def __init__(self, username: str, password: str, data: BotData = BotData):
		print('initialize bot')
		self.username = username
		self.password = password
		self.data  = data
		self.time_start = time.time()

	def open(self):
		mobile_emulation = { "deviceName": "Nexus 5" }
		chrome_options = webdriver.ChromeOptions()
		chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)
		self.driver = webdriver.Chrome(self.PATH, options=chrome_options)
		self.driver.get(self.url)
		time.sleep(1)

	def __handleNotificationRequest(self):
		try:
			not_now_btn = self.driver.find_element_by_xpath('/html/body/div[4]/div/div/div[3]/button[2]')
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
		# writing username
		self.driver.find_element_by_name('username').send_keys(self.username)
		# writing password
		self.driver.find_element_by_name('password').send_keys(self.password)

		# pressing login button
		self.driver.find_element_by_xpath("//*[@id='loginForm']/div[1]/div[6]/button[1]").click()
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
		WebDriverWait(self.driver, 5).until(expected_conditions.element_to_be_clickable((By.XPATH, "//*[@id='react-root']/section[1]/div[1]/header/div/div[2]/button")))
		
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/div[1]/header/div/div[2]/button").click()

		self.exec_time = (time.time() - self.time_start)/60
		if self.exec_time % 20 == 0: time.sleep(60)
		if self.exec_time % 117 == 0: time.sleep(60 * 17)
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

	def scrape_followers(driver):
    # Load account page

    # Click the 'Follower(s)' link
    # driver.find_element_by_partial_link_text("follower").click()

    # Wait for the followers modal to load
		#waiter.find_element(self.driver, "//div[@role='dialog']", by=XPATH)

    # At this point a Followers modal pops open. If you immediately scroll to the bottom,
    # you hit a stopping point and a "See All Suggestions" link. If you fiddle with the
    # model by scrolling up and down, you can force it to load additional followers for
    # that person.

    # Now the modal will begin loading followers every time you scroll to the bottom.
    # Keep scrolling in a loop until you've hit the desired number of followers.
    # In this instance, I'm using a generator to return followers one-by-one
		follower_css = "ul div li:nth-child({}) a.notranslate"  # Taking advange of CSS's nth-child functionality
		for group in itertools.count(start=1, step=12):
			for follower_index in range(group, group + 12):
				self.data.addFound(waiter.find_element(self.driver, follower_css.format(follower_index)).text)

        # Instagram loads followers 12 at a time. Find the last follower element
        # and scroll it into view, forcing instagram to load another 12
        # Even though we just found this elem in the previous for loop, there can
        # potentially be large amount of time between that call and this one,
        # and the element might have gone stale. Lets just re-acquire it to avoid
        # that
				last_follower = waiter.find_element(driver, follower_css.format(follower_index))
				driver.execute_script("arguments[0].scrollIntoView();", last_follower)

	def searchHashtag(self, hashtag: str):
		custom_url = self.url + '/explore/tags/{tag}'
		custom_url = custom_url.format(tag = hashtag)
		self.driver.get(custom_url)

	def searchUser(self, username: str):
		custom_url = self.custom_url.format(username = username)
		self.driver.get(custom_url)

	def getFollowednumber(self):
		return int(self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/main[1]/div[1]/ul[1]/li[3]/a[1]/span[1]").text)

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

	def getFollowersNumber(self):
		return int(self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/main[1]/div[1]/ul[1]/li[2]/a[1]/span[1]").text)

	def addFollowersToList(self):
		# click "seguiti"
		self.driver.find_element_by_xpath("//*[@id='react-root']/section[1]/main[1]/div[1]/ul[1]/li[2]/a[1]/span[1]").click()
		# add account to list

		self.scrape_followers()

		""" WebDriverWait(self.driver, 10).until(expected_conditions.visibility_of_element_located((By.CSS_SELECTOR, 'a.notranslate')))
		list_of_elements = self.driver.find_elements_by_css_selector('a.notranslate')
		print(list_of_elements)
		for i in list_of_elements:
			self.totalFound += 1
			print (i.text)
			self.data.addFound(i.text)

		print('found {count} new accounts'.format(count = self.totalFound)) """

	def checkUserFollowers(self, account):
		pass


	def close(self):
		self.driver.close()