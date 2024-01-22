import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Profile } from '../shared/models/profile.model';
import { profileHost } from './profile.mock';

@Injectable()
export class ProfileServiceMock {
    mockResponse: Profile = profileHost;

    getProfile(): Observable<Profile> {
        return new Observable((observer) => {
            observer.next(this.mockResponse);
            observer.complete();
        });
    }

    updateProfile(updatedProfile: Profile): Observable<Profile> {
        return new Observable((observer) => {
            observer.next(updatedProfile);
            observer.complete();
        });
    }

    deleteProfile(): Observable<void> {
        return new Observable((observer) => {
            observer.complete();
        });
    }

    getProfileById(profileId: number): Observable<Profile> {
        return new Observable((observer) => {
            observer.next(this.mockResponse);
            observer.complete();
        });
    }
}

