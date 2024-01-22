import { Injectable } from "@angular/core";
import { Observable, delay, of, single, BehaviorSubject } from "rxjs";
import { Account } from "../account/model/account.model";
import jasmine from "jasmine";

@Injectable()
export class AccountServiceMock {

  private user$ = new BehaviorSubject<string | null>(null);

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

  updatePassword(account: Account): Observable<Account> {
    return of(this.mockResponse).pipe(delay(1000));
  }

  getProfileImage(): Observable<Blob> {
    const mockImageData = new Uint8Array([1, 2, 3]);
    return of(new Blob([mockImageData], { type: 'image/jpeg' }));
  }

  getAccountId(): number {
    return 1;
  }

  setUser(): void {
    this.user$.next('mockedUser');
  }
}

