import { Injectable } from '@angular/core';
import { Account } from './model/account.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {AuthResponse} from "./model/auth-resposne.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import { environment } from '../../env/environment';
import { ApiPaths } from '../shared/api/api-paths.enum';
import PasswordUpdate from "../shared/models/password-update.model";
import {Property} from "../shared/models/property.model";
import { NotificationService } from '../notifications/notification.service';
import NotificationType from "../shared/models/notification-type.enum";

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

  constructor(private http: HttpClient, private notificationService: NotificationService) {
    this.user$.next(this.getRole());
  }

  login(auth: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiHost}/${ApiPaths.LogIn}`, auth, {
      headers: this.headers,
    }).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem(environment.userLocalStorageKey, response.accessToken);
        this.setUser();
        this.notificationService.initializeWebSocketConnection();
      })
    );
  }

  logout(): Observable<string> {
    return this.http.get(`${environment.apiHost}/${ApiPaths.LogOut}`, {
      responseType: 'text',
    }).pipe(
      tap(() => {
        this.notificationService.closeSocket();
      })
    );
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

  getFavoriteProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.apiHost}/${ApiPaths.Profile}/favorites`);
  }

  addFavoriteProperty(propertyId: number) {
    return this.http.post(`${environment.apiHost}/${ApiPaths.Profile}/favorites/${propertyId}`, null);
  }

  deleteFavoriteProperty(propertyId: number) {
    return this.http.delete(`${environment.apiHost}/${ApiPaths.Profile}/favorites/${propertyId}`);
  }

  getProfileImage(): Observable<Blob> {
    return this.http.get(`${environment.apiHost}/${ApiPaths.Profile}/profile-image`,
      {responseType: 'blob'});
  }

  updateProfileImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${environment.apiHost}/${ApiPaths.Profile}/profile-image`, formData);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${environment.apiHost}/${ApiPaths.Profile}/${id}`);
  }

  toggleNotificationsEnabled(type: NotificationType) {
    return this.http.put<Account>(`${environment.apiHost}/${ApiPaths.Profile}/notifications`, {type});
  }
}
