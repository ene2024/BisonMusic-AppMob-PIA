import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { GlobalService } from '../global.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  userData: any;
  topArtists: any[] = [];
  topPlaylists: any[] = [];
  newReleases: any[] = [];
  loading: boolean = false;

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

      this.loadTopContent();
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
    this.loadTopContent();
  }

  logout() {
    localStorage.clear();
    this.userData = null;
    window.location.href = '/';
  }

  loadTopContent() {
    this.loading = true;

    this.spotifyService.getNewReleases().subscribe(( data: any) => {
      this.newReleases = data;
      this.loading = false;
    });

    this.spotifyService.getTopPlaylists().subscribe(( data: any) => {
      this.topPlaylists = data.playlists.items;
    }, error => {
      console.error('Error fetching top playlists:', error);
    });

    this.spotifyService.getArtistas('pop').subscribe(data => {
      this.topArtists = data;
    }, error => {
      console.error('Error fetching random artists:', error);
    });
  }
}
