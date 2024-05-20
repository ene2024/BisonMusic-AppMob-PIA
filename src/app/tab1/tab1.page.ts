import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  /*
  public nuevasCanciones: any[] = [];

  constructor(private _spotifyService: SpotifyService) { 
    if (this._spotifyService.checkTokenSpo()) {
      this._spotifyService.getNewReleases().subscribe((data: any) => {
        this.nuevasCanciones = data;
      }, error => {
        error.status == 401 && (this._spotifyService.tokenRefreshURL());
      });
    }
  }*/

  userData: any;

  constructor(private _globalService: GlobalService, private spotifyService: SpotifyService) { }

  async ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      await this._globalService.getToken(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (this._globalService.accessToken) {
      this.spotifyService.getUserData().subscribe(data => {
        this.userData = data;
        console.log('User Data:', this.userData);
      });
    }

    this._globalService.logAccessToken();
  }

  login() {
    this._globalService.redirectToSpotifyAuthorize();
  }

  async refreshToken() {
    await this._globalService.refreshToken();
    this.spotifyService.getUserData().subscribe(data => {
      this.userData = data;
    });
  }

  logout() {
    localStorage.clear();
    this.userData = null;
    window.location.href = '/';
  }
}
