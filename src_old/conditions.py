class condition(object):
	"""An expectation for checking that the page changes length.

	locator - used to find the element
	returns the WebElement once it has the particular css class
	"""
	def __init__(self, r):
		self.height = 0

	def __call__(self, driver):
		height = driver.execute_script("return document.body.scrollHeight")   # Finding the referenced element
		if self.height > height:
			self.height = height
			return True
		else:
			self.height = height
			return False