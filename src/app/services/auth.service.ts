/*import { Injectable } from '@angular/core';
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
    console.log('Initializing AuthService...');
  
    if (code) {
      console.log('Code found:', code);
      await this._globalService.getToken(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  
    this._spotifyService.getUserData().subscribe(data => {
      console.log('User data:', data);
      this.userDataSubject.next(data);
      if (this._globalService.accessToken) {
        console.log('Redirecting to /tabs/tab1...');
        this.router.navigate(['/tabs/tab1']);
      }
    }, error => {
      console.error('Error fetching user data:', error);
      if (error.status === 401) {
        this._globalService.redirectToSpotifyAuthorize();
      }
    });
  }
  
  

  login() {
    this._globalService.redirectToSpotifyAuthorize();
  }

  logout() {
    localStorage.clear();
    this.userDataSubject.next(null);
    this.router.navigate(['/']);
  }
}*/
