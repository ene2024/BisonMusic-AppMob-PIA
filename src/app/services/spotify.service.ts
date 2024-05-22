import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor (private http: HttpClient, private _globalService: GlobalService) {}
  getUserData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._globalService.accessToken}`
    });

    return this.http.get('https://api.spotify.com/v1/me', { headers });
  }

  getInfo(query: string){
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this._globalService.accessToken})};

    return this.http.get(URL, HEADER);
  }
/*
  getRandomArtists() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._globalService.accessToken}`
    });

    return this.http.get('https://api.spotify.com/v1/browse/categories/pop/playlists', { headers });
  }

  getRandomTracks() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._globalService.accessToken}`
    });

    return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers });
  }*/

  getTopPlaylists() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._globalService.accessToken}`
    });

    return this.http.get('https://api.spotify.com/v1/browse/featured-playlists', { headers });
  }

  getNewReleases() {

    return this.getInfo('browse/new-releases?limit=50&offset=0').pipe(map((data: any) => data.albums.items));

  }

  getArtistas(v: string) {

      return this.getInfo(`search?q=${v}&type=artist&limit=50&offset=0`).pipe(map((data: any) => data.artists.items));

  }

  getArtista(v: string) {

      return this.getInfo(`artists/${v}`);

  }

/*
  getTopTracks() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._globalService.accessToken}`
    });

    return this.http.get('https://api.spotify.com/v1/me/top/tracks', { headers });
  }*/
}