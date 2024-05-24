import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from '../global.service';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient, private _globalService: GlobalService, private _spotifyService: SpotifyService, private router: Router) {}

  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      await this._globalService.getToken(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (this._globalService.accessToken) {
      this._spotifyService.getUserData().subscribe(data => {
        this.router.navigate(['/tabs/tab1']);
        this.userDataSubject.next(data);
      }, error => {
        console.error('Error fetching user data:', error);
        if (error.status === 401) {
          this.router.navigate(['/sign-up']);
        }
      });
    }
  }

  login() {
    this._globalService.redirectToSpotifyAuthorize();
  }

  logout() {
    localStorage.clear();
    this.userDataSubject.next(null);
    this.router.navigate(['/']);
  }
}
