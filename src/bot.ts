import * as puppeteer from 'puppeteer';


class Bot {
  chromedriver_path: string = 'C:/dev/instapy/bin/';
  intagram_url: string = 'https://instagram.com/';
  username: string | null = null;
  password: string | null = null;
  iPhone = puppeteer.devices['iPhone 6'];
  driver = {};
  page: puppeteer.Page | null = null;
  start_time: number = Date.now();

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  async open() {
    const browser = await puppeteer.launch({ headless: false });
    this.page = await browser.newPage();
    await this.page.emulate(this.iPhone);
    await this.page.goto(this.intagram_url);
    console.log(await this.page.title());
  }

  private async acceptCookies() {
    var [accept] = await this.page.$x('//body/div[2]/div[1]/div[1]/div[1]/div[2]/button[1]')
    if (accept) {
      await accept.tap()
    }
    else console.error('Failed to click accept cookie button')
  }

  private async clickAccedi() {
      var [accedi] = await this.page.$x('//*[@id=\'react-root\']/section[1]/main[1]/article[1]/div[1]/div[1]/div[1]/div[2]/button[1]')
      if (accedi) {
        await accedi.tap()
      }
      else console.error('Failed to click accedi button')
    }

  private async handleNotificationRequest() {
		var [not_now_button] = await this.page.$x('//body/div[4]/div/div/div/div[3]/button[2]')
    if (not_now_button) {
      await not_now_button.tap()
    }
    else console.error('Failed to click not now notification button')
  }

  private async saveAccessInfo() {
		var [not_now_button] = await this.page.$x('/html/body/div[1]/section/main/div[1]/div[1]/div[1]/button[1]')
    if (not_now_button) {
      await not_now_button.tap()
    }
    else console.error('Failed to click not now save info button')
  }

  private async clickBody() {
		var [body] = await this.page.$x('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[1]')
    if (body) {
      await body.tap()
    }
    else console.error('Failed to click body')
  }

  async doLogin() {
    await this.acceptCookies();
    await this.clickAccedi();
    await this.page.waitForSelector("[name='username']");
    await this.page.type("[name='username']", this.username);
    await this.page.keyboard.down('Tab');
    await this.page.keyboard.type(this.password);
    var [login] = await this.page.$x('//*[@id=\'loginForm\']/div[1]/div[6]/button[1]')
    if (login) await login.tap();
    else console.error('Failed to click login button')
    await this.page.waitFor(8000);
    await this.saveAccessInfo();
    await this.page.waitForNavigation({
      waitUntil: 'networkidle0',
    });
    
  }
  
  async goToDirect() {
    await this.page.goto('https://www.instagram.com/direct/inbox');
    await this.handleNotificationRequest();
    await this.clickBody();
  }
  
  async sendMessage(username: string, message: string ) {
    const lclock: number = Date.now();
    // type on search box
    await this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[1]/div[1]/div[2]/input[1]');
    await this.page.type('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[1]/div[1]/div[2]/input[1]', username);
    // click first account
    var firsst_acc = await this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/button[1]');
    if (firsst_acc) await firsst_acc.tap();
    else console.error('Failed to click first account or account does not exist');
    // click avanti
    var avanti = await this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/div[1]/header/div/div[2]/button')
    if(avanti) await avanti.tap();
    else console.error('Failed to click avanti button');

    var exec_time = (Date.now() - this.start_time) / 60;
    if (exec_time % 20 == 0) await setTimeout(() => true, 60 * 1000);
    if (exec_time % 117 == 0) await setTimeout(() => true, 17 * 60 * 1000);
    else await setTimeout(() => true, (Math.floor(Math.random() * (7.5 - 4 + 1)) + 4) * 1000);

    // send mesage
    await this.page.waitForXPath('//*[@id= \'react-root\']/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/textarea[1]');
    await this.page.type('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/textarea[1]', message);
    var send = await this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/div[1]/header[1]/div[1]/div[1]');
    if (send) await send.tap();
    else console.error('Failed to send message');

    // todo data makedone 

    await setTimeout(() => true, 2000);

    console.log(`This user took about ${Date.now() - this.start_time}`);
  }

}


export default Bot