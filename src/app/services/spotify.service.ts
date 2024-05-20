import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
/*
  public credentials = {

    clientId: 'a0728abd90734b07be8c274d022862a0',
    clientSecret: 'ea160ec8a22f4ad58580322632ce664e',
    accessToken: ''

  };

  public poolURlS = {

    authorize: 'https://accounts.spotify.com/es-ES/authorize?client_id=' +
      this.credentials.clientId + '&response_type=token' +
      '&redirect_uri=' + encodeURIComponent('http://localhost:8100/tabs/tab1/') +
      '&expires_in=3600',
    refreshaAcessToken: 'https://accounts.spotify.com/api/token'

  };

  constructor(private _httpClient: HttpClient) {

    this.upDateToken()

  }

  upDateToken(){
    this.credentials.accessToken = sessionStorage.getItem('token') || '';
    console.log('Access Token:', this.credentials.accessToken);
  }

  getInfo(query: string){
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.credentials.accessToken})};
    console.log('Request URL:', URL);
    console.log('Request Headers:', HEADER);
    return this._httpClient.get(URL, HEADER);
  }

/*  checkTokenSpoLogin() {

    this.checkTokenSpo() || (sessionStorage.setItem('http://localhost:8100/tabs/tab1', location.href), window.location.href = this.poolURlS.authorize);

  }

  checkTokenSpo() {

    return !!this.credentials.accessToken;

  }

  tokenRefreshURL() {

    this.checkTokenSpo() && alert('Expiro la sesión');

    this.credentials.accessToken = '';
    sessionStorage.removeItem('token');
    this.checkTokenSpoLogin();

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

  getTopTracks(v: string) {

      return this.getInfo(`artists/${v}/top-tracks?country=us`);

  }
*/
  constructor (private http: HttpClient, private _globalService: GlobalService) {}
  getUserData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._globalService.accessToken}`
    });

    return this.http.get('https://api.spotify.com/v1/me', { headers });
  }

  getInfo(query: string){
    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = {headers: new HttpHeaders({'Authorization': 'Bearer ' + this._globalService.accessToken})};
    console.log('Request URL:', URL);
    console.log('Request Headers:', HEADER);
    return this.http.get(URL, HEADER);
  }
}