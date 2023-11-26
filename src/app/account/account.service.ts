import { Injectable } from '@angular/core';
import { Account } from './model/account.model';

const ACCOUNTS: Account[] = [
  {
    "id": 1,
    "email": "admin@example.com",
    "password": "pass",
    "name": "Neko",
    "surname": "Nekic",
    "address": "Negde 45, Novi Sad",
    "phoneNumber": "061234567",
    "role": "admin",
    "notificationsEnabled": true,
    "verified": true,
    "blocked": false
  },
  {
    "id": 2,
    "email": "host@example.com",
    "password": "pass",
    "name": "Mirna",
    "surname": "Studsluzbic",
    "address": "Fruskogorska 1, Novi Sad",
    "phoneNumber": "021555555",
    "role": "host",
    "notificationsEnabled": true,
    "verified": true,
    "blocked": false
  },
  {
    "id": 3,
    "email": "guest@example.com",
    "password": "pass",
    "name": "Branko",
    "surname": "Kvalitetic",
    "address": "Trg Dositeja Obradovica 6, Novi Sad",
    "phoneNumber": "021555555",
    "role": "guest",
    "notificationsEnabled": true,
    "verified": true,
    "blocked": false
  }
];


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountList: Account[] = [];

  constructor() {
    for (let accountObj of ACCOUNTS) {
      const account: Account = {
        id: accountObj.id,
        email: accountObj.email,
        password: accountObj.password,
        name: accountObj.name,
        surname: accountObj.surname,
        address: accountObj.address,
        phoneNumber: accountObj.phoneNumber,
        role: accountObj.role,
        notificationsEnabled: accountObj.notificationsEnabled,
        verified: accountObj.verified,
        blocked: accountObj.blocked,
      };
      this.accountList.push(account);
    }
  }

  getAll() : Account[] {
    return this.accountList;
  }

  add(account: Account) : void {
    this.accountList.push(account);
  }
  
  getUser(email: String, password: String): Account|null {
    return this.accountList.find((account) => account.email == email && account.password == password) || null;
  }
}
