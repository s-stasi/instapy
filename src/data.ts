import * as fs from 'fs';
import Bot from './bot';

interface account {
  username: string;
  followers: number;
  followed: number;
  done: boolean;
};

interface files {
  accounts: Array<account>;
};

class BotData {
  found_accounts: files;
  tags_and_accounts: {accounts: Array<string>};
  username: string;
  password: string;

  constructor(username: string, password: string) {
    console.log(fs.readFileSync('./data/tags_and_accounts.json'))
    this.found_accounts = (fs.readFileSync('./data/found_accounts.json')) ? JSON.parse(fs.readFileSync('./data/found_accounts.json').toString()) : {accounts: []as account[]};
    this.tags_and_accounts = (fs.readFileSync('./data/tags_and_accounts.json')) ? JSON.parse(fs.readFileSync('./data/tags_and_accounts.json').toString()) :{accounts: []};
    this.username = username;
    this.password = password;
  }

  getList(): Array<string> {
    return this.tags_and_accounts.accounts;
  }

  private async checkAccount(username: string): Promise<account>{
    var account: account = {
      username: username,
      followers: 0,
      followed: 0,
      done: false
    }
    var bot = new Bot(this.username, this.password);
    await bot.open();
    await bot.searchUser(username);
    account.followers = await bot.getFollowersNumber();
    account.followed = await bot.getFollowedNumber();
    return account
  }

  async addFound(username: string) {
    var isIn: boolean = false;
    this.checkAccount(username)
    .then((acc) => {
      for (const i of this.found_accounts.accounts) {
        if (acc.username == i.username) {
          isIn = true;
        }
      }
      if (isIn) return
      this.found_accounts.accounts.push(acc);
    });
  }

  async save(): Promise<void> {
    fs.writeFileSync('./data/found_accounts.json', JSON.stringify(this.found_accounts));
  }
}

export {
  account
}

export default BotData;