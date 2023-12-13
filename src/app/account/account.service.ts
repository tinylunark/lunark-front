import { Injectable } from '@angular/core';
import { Account } from './model/account.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthResponse} from "./model/auth-resposne.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import { environment } from '../../env/environment';
import { ApiPaths } from '../shared/api/api-paths.enum';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("unregistered");
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
    return 'unregistered';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(environment.userLocalStorageKey) != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }
}
