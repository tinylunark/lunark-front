import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from './models/profile.model';
import { ApiPaths } from './api/api-paths.enum';
import { environment } from '../../env/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiHost}/${ApiPaths.Profile}`;
  private profile: Profile | null = null;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    const headers = this.createAuthorizationHeaders();
    const url = this.createProfileUrl();
    return this.http.get<Profile>(url, { headers });
  }

  updateProfile(updatedProfile: Profile): Observable<Profile> {
    const headers = this.createAuthorizationHeaders();
    const url = this.createProfileUrl();
    return this.http.put<Profile>(url, updatedProfile, { headers });
  }

  deleteProfile(): Observable<void> {
    const headers = this.createAuthorizationHeaders();
    const url = this.createProfileUrl();
    return this.http.delete<void>(url, { headers });
  }

  private createAuthorizationHeaders(): HttpHeaders {
    const token = localStorage.getItem(environment.userLocalStorageKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  getProfileById(profileId: number): Observable<Profile> {
    const headers = this.createAuthorizationHeaders();
    const url = `${this.apiUrl}/${profileId}`;
    return this.http.get<Profile>(url, { headers });
  }

  private createProfileUrl(): string {
    const profileId = this.extractProfileIdFromToken();
    return `${this.apiUrl}/${profileId}`;
  }

  private extractProfileIdFromToken(): number {
    const token: any = localStorage.getItem(environment.userLocalStorageKey);
    const decodedToken: any = jwtDecode(token);
    return decodedToken.profileId;
  }

  logout(): void {
    localStorage.removeItem(environment.userLocalStorageKey);
  }
}

