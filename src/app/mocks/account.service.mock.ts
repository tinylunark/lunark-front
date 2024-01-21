import { Injectable } from "@angular/core";
import { Observable, delay, of, single } from "rxjs";
import { Account } from "../account/model/account.model";

@Injectable()
export class AccountServiceMock {
    mockResponse: Account = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        surname: 'Test Surname',
        phoneNumber: '123456789',
        address: 'Test Address',
        role: 'GUEST'
    };

    signUp(account: Account): Observable<Account> {
        return of(this.mockResponse).pipe(delay(1000));
    }
}
