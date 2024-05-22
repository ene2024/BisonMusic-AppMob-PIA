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
  topArtists: any[] = [];
  topPlaylists: any[] = [];
  topTracks: any[] = [];
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

  loadTopContent() {/*
    this.spotifyService.getRandomArtists().subscribe((data: any) => {
      if (data && data.playlists && data.playlists.items.length > 0) {
        const tracks = data.playlists.items.flatMap((playlist: any) => playlist.tracks.items);
        this.topArtists = tracks.map((track: any) => track.artists[0]);
      }
    }, error => {
      console.error('Error fetching random artists:', error);
    });

    this.spotifyService.getTopPlaylists().subscribe((data: any) => {
      if (data && data.playlists && data.playlists.items) {
        this.topPlaylists = data.playlists.items;
      }
    }, error => {
      console.error('Error fetching top playlists:', error);
    });

    this.spotifyService.getRandomTracks().subscribe((data: any) => {
      if (data && data.albums && data.albums.items.length > 0) {
        this.topTracks = data.albums.items.flatMap((album: any) => album.tracks.items);
      }
    }, error => {
      console.error('Error fetching random tracks:', error);
    });*/
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
