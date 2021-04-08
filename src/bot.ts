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

  async open(): Promise<void> {
    const browser = await puppeteer.launch({ headless: false });
    this.page = await browser.newPage();
    await this.page.emulate(this.iPhone);
    await this.page.goto(this.intagram_url);
    console.log(await this.page.title());
  }

  private async acceptCookies(): Promise<void> {
    var [accept] = await this.page.$x('//body/div[2]/div[1]/div[1]/div[1]/div[2]/button[1]')
    if (accept) {
      await accept.tap()
    }
    else console.error('Failed to click accept cookie button')
  }

  private async clickAccedi(): Promise<void> {
    var accedi = await this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/main[1]/article[1]/div[1]/div[1]/div[1]/div[2]/button[1]', {
      timeout: 4000,
      visible: true
    });
    if(accedi) return await accedi.tap();
    else console.error('Unable to click accedi button')
  }

  private async handleNotificationRequest(): Promise<void> {
		var [not_now_button] = await this.page.$x('//body/div[4]/div/div/div/div[3]/button[2]')
    if (not_now_button) {
      await not_now_button.tap()
    }
    else console.error('Failed to click not now notification button')
  }

  private async saveAccessInfo(): Promise<void> {
		var [not_now_button] = await this.page.$x('/html/body/div[1]/section/main/div[1]/div[1]/div[1]/button[1]')
    if (not_now_button) {
      await not_now_button.tap()
    }
    else console.error('Failed to click not now save info button')
  }

  private async clickBody(): Promise<void> {
		var [body] = await this.page.$x('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[1]')
    if (body) {
      await body.tap()
    }
    else console.error('Failed to click body')
  }

  async doLogin(): Promise<void> {
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
  
  async goToDirect(): Promise<void> {
    await this.page.goto('https://www.instagram.com/direct/inbox');
    await this.handleNotificationRequest();
    await this.clickBody();
  }
  
  async sendMessage(username: string, message: string ): Promise<void> {
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

  async scrollDown(): Promise<void> {
    console.log('scrolldown');
    var last_height = await this.page.evaluate(() => {
      return document.body.scrollHeight;
    });

    while (true) {
      var time = Date.now();
      while (true) {
        if (last_height < await this.page.evaluate(() => {return document.body.scrollHeight;})) {
          last_height = await this.page.evaluate(() => {return document.body.scrollHeight;});
          break;
        }
        if ((Date.now() - time) > 20 * 1000) return;
      }

      await this.page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight)});
      await setTimeout(() => true, (Math.floor(Math.random() * (1.65 - 0.58 + 1)) + 0.58) * 1000);
      console.log('scrolling');
    }
  }

  async searchHashtag(hashtag: string): Promise<void> {
    const hashtag_url = this.intagram_url + 'explore/tags/' + hashtag;
    await this.page.goto(hashtag_url);
  }

  async searchUser(username: string): Promise<void> {
    const username_url = this.intagram_url + username;
    await this.page.goto(username_url)
  }

  async getFollowedNumber(): Promise<number> { 
    var followed = await this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/main[1]/div[1]/ul[1]/li[3]/a[1]/span[1]');
    if(followed) return parseInt(await this.page.evaluate(el => el.textContent, followed))
    else console.error('Unable to get followed number')
  }

  async getFollowersNumber(): Promise<number> { 
    var followed = await this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/main[1]/div[1]/ul[1]/li[2]/a[1]/span[1]');
    if(followed) return parseInt(await this.page.evaluate(el => el.textContent, followed))
    else console.error('Unable to get followers number')
  }

  async getFollowersList(): Promise<Array<string>> {
    var count: number = 0;
    var str_list: Array<string>;
    var followers_button = await this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/main[1]/div[1]/ul[1]/li[2]/a[1]/span[1]');
    if(followers_button) await followers_button.tap();
    else console.error('Unable to click followers button')

    await setTimeout(async () => {
      await this.scrollDown();
    }, 6 * 1000);

    var list = await this.page.$$('a .notranslate');
    for(var i of list ){
      count ++;
      const username = await this.page.evaluate(el => el.textContent, i);
      str_list.push(username)
      console.log('Username: ' + username);
    }

    console.log('Found ' + count.toString() + 'accounts');
    return str_list;
  }

  async getFollowedList(): Promise<Array<string>> {
    var count: number = 0;
    var str_list: {list: string[], length: 0};
    var followers_button = await this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/main[1]/div[1]/ul[1]/li[3]/a[1]/span[1]');
    if(followers_button) await followers_button.tap();
    else console.error('Unable to click followed button')
    console.log('clicked followed button');

    console.log('strarting timeout of 6 sec');
    await setTimeout(() => {}, 6 * 1000);
    console.log('finished timeout');
    console.log('scrolling..');
    await this.scrollDown();
    console.log('done');

    var list = await this.page.$$('li');
    console.log(list)
    var obj_list = { list: list, length: list.length}
    console.log(obj_list.list.length);


    for(var i = 0; i < obj_list.length; i++ ){
      var name = await obj_list.list[i].$eval('a.FPmhX', node => node.textContent);
      count ++;
      console.log('here');
      str_list.list.push(name)
      console.log(str_list);
      console.log('Username: ' + name);
    }

    console.log('Found ' + count.toString() + ' accounts');
    return str_list.list;
  }

  async close(): Promise<void> {
    await this.page.close();
  }
}


export default Bot