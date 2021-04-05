import * as fs from 'fs';
import { WorkerPool } from 'workerpool';
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
  tags_and_accounts: files;
  username: string;
  password: string;



  constructor(username: string, password: string) {
    this.found_accounts = (fs.openSync('../data/found_accounts.json', 'w+').toString()) ? JSON.parse(fs.openSync('../data/found_accounts.json', 'w+').toString()) : {accounts: []as account[]};
    this.found_accounts = (fs.openSync('../data/tags_and_accounts.json', 'w+').toString()) ? JSON.parse(fs.openSync('../data/tags_and_accounts.json', 'w+').toString()) :{accounts: []as account[]};
    this.username = username;
    this.password = password;
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

  addFound(username: string) {
    var isIn:boolean = false;
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


}

export {
  account
}

export default BotData;