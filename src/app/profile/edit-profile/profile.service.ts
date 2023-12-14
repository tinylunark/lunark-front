import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../../shared/models/profile.model';
import { ApiPaths } from '../../shared/api/api-paths.enum';
import { environment } from '../../../env/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiHost}/${ApiPaths.Profile}`;
  private profile: Profile | null = null;

  // Use BehaviorSubject to notify subscribers about changes
  private profileSubject = new BehaviorSubject<Profile | null>(null);
  profileUpdated = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    const token: any = localStorage.getItem(environment.userLocalStorageKey);
    const decodedToken: any = jwtDecode(token);
    const profileId = decodedToken.profileId;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${profileId}`;
    return this.http.get<Profile>(url, { headers });
  }

  updateLocalProfile(updatedProfile: Profile): Profile {
    this.profileSubject.next(updatedProfile);
    return this.profile = updatedProfile;
  }

  getCurrentProfile(): Profile | null {
    return this.profile;
  }

  updateProfile(updatedProfile: Profile): Observable<Profile> {
    const token: any = localStorage.getItem(environment.userLocalStorageKey);
    const decodedToken: any = jwtDecode(token);
    const profileId = decodedToken.profileId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    const url = `${this.apiUrl}/${profileId}`;
    return this.http.put<Profile>(url, updatedProfile, { headers });
  }

deleteProfile(): Observable<void> {
    const token: any = localStorage.getItem(environment.userLocalStorageKey);
    const decodedToken: any = jwtDecode(token);
    const profileId = decodedToken.profileId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    const url = `${this.apiUrl}/${profileId}`;

    return this.http.delete<void>(url, { headers });
  }

  logout(): void {
    localStorage.removeItem(environment.userLocalStorageKey);
  }}

