from bot import Bot
from saveData import BotData
from threading import Thread
import time
import sys

if len(sys.argv) == 1:
	pass
elif 'gui' in sys.argv:
	import pygame
	import pygame_gui

	pygame.init()

	pygame.display.set_caption('Instabot')
	window_surface = pygame.display.set_mode((800, 600))

	background = pygame.Surface((800, 600))
	background.fill(pygame.Color('#CA70BF'))
	manager = pygame_gui.UIManager((800, 600))
	start = pygame_gui.elements.UIButton(relative_rect=pygame.Rect((350, 275), (100, 50)),text='start',manager=manager)
	stop = pygame_gui.elements.UIButton(relative_rect=pygame.Rect((450, 275), (100, 50)),text='stop',manager=manager)

	clock = pygame.time.Clock()
	is_running = True


	data = BotData()
	# bot = Bot('cricetonzi', 'S4muele2002', data)
	# bot.open()
	# bot.doLogin()
	# bot.goToDirect()
	# for i in data.getAccounts():
	# 	bot.sendMessage(i, ".")
	# bot.close()
	bot = Bot('cricetonzi', 'S4muele2002', data)

	def runbot():
		bot.open()
		bot.doLogin()
		bot.goToDirect()

	def closebot():
		bot.close()

	runthread = Thread(target = runbot)


	while is_running:
		time_delta = clock.tick(60)/1000.0


		for event in pygame.event.get():

			if event.type == pygame.QUIT:
				is_running = False

			if event.type == pygame.USEREVENT:
				if event.user_type == pygame_gui.UI_BUTTON_PRESSED:
					if event.ui_element == start:
						runthread.start()
					elif event.ui_element == stop:
						closebot()

			manager.process_events(event)



		manager.update(time_delta)

		window_surface.blit(background, (0, 0))
		manager.draw_ui(window_surface)

		pygame.display.update()

data = BotData()
bot = Bot('cricetonzi', 'S4muele2002', data)
bot.open()
bot.doLogin()

if 'list' in sys.argv :
	bot.searchUser("tatuaggi_ita_")
	bot.addFollowersToList()

if 'message' in sys.argv:
	bot.goToDirect()
	for i in data.getAccounts():
		bot .sendMessage(i, "")

bot.close()