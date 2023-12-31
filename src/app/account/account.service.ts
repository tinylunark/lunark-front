import { Injectable } from '@angular/core';
import { Account } from './model/account.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthResponse} from "./model/auth-resposne.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import { environment } from '../../env/environment';
import { ApiPaths } from '../shared/api/api-paths.enum';
import PasswordUpdate from "../shared/models/password-update.model";

const notLoggedInRole = "unregistered";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });


  user$ = new BehaviorSubject(notLoggedInRole);
  userState = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(auth: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiHost}/${ApiPaths.LogIn}`, auth, {
      headers: this.headers,
    });
  }

  logout(): Observable<string> {
    return this.http.get(`${environment.apiHost}/${ApiPaths.LogOut}`, {
      responseType: 'text',
    });
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem(environment.userLocalStorageKey);
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).role[0].authority;
    }
    return notLoggedInRole;
  }

  getAccountId(): number | null {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem(environment.userLocalStorageKey);
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).profileId;
    }
    return null;
  }

  isLoggedIn(): boolean {
    const accessToken: any = localStorage.getItem(environment.userLocalStorageKey);
    if(accessToken == null || this.isTokenExpired(accessToken)) {
      localStorage.removeItem(environment.userLocalStorageKey);
      this.user$.next(notLoggedInRole);
      return false;
    }
    return true;
  }
  isTokenExpired(accessToken: any): boolean {
    const helper = new JwtHelperService();
    return helper.decodeToken(accessToken).exp < Date.now() / 1000;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  signUp(account: Account): Observable<Account> {
    return this.http.post<Account>(`${environment.apiHost}/${ApiPaths.Profile}`, account, {
      headers: this.headers,
    });
  }

  verify(verificationLinkId: number) {
    return this.http.post(`${environment.apiHost}/${ApiPaths.Verification}/${verificationLinkId}`, {
      headers: this.headers,
    }, {responseType: 'text'});
  }

  updatePassword(passwordData: PasswordUpdate): Observable<any> {
    return this.http.put(`${environment.apiHost}/${ApiPaths.Profile}/update-password`, passwordData);
  }

}
