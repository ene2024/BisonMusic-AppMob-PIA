import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private clientId = 'a0728abd90734b07be8c274d022862a0';
  private redirectUrl = 'http://localhost:8100/tabs/tab1';
  private authorizationEndpoint = "https://accounts.spotify.com/authorize";
  private tokenEndpoint = "https://accounts.spotify.com/api/token";
  private scope = 'user-read-private user-read-email';

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(response: any) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('expires_in', expires_in.toString());

    const now = new Date();
    const expiry = new Date(now.getTime() + (expires_in * 1000));
    localStorage.setItem('expires', expiry.toString());
  }

  private get codeVerifier() {
    return localStorage.getItem('code_verifier') || '';
  }

  get accessToken() {
    return localStorage.getItem('access_token') || null;
  }

  isTokenValid(): boolean {
    const expires = localStorage.getItem('expires');
    if (expires) {
      return new Date(expires) > new Date();
    }
    return false;
  }

  async redirectToSpotifyAuthorize() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = Array.from(randomValues).map(x => possible[x % possible.length]).join('');

    const codeVerifier = randomString;
    const data = new TextEncoder().encode(codeVerifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);
    const codeChallengeBase64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    localStorage.setItem('code_verifier', codeVerifier);

    const authUrl = new URL(this.authorizationEndpoint);
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      scope: this.scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallengeBase64,
      redirect_uri: this.redirectUrl
    });

    authUrl.search = params.toString();
    window.location.href = authUrl.toString(); 
  }

  async getToken(code: string) {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUrl)
      .set('code_verifier', this.codeVerifier);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const response = await this.http.post(this.tokenEndpoint, body.toString(), { headers }).toPromise();
    this.saveToken(response);
  }

  async refreshToken() {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('grant_type', 'refresh_token')
      .set('refresh_token', localStorage.getItem('refresh_token') || '');

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const response = await this.http.post(this.tokenEndpoint, body.toString(), { headers }).toPromise();
    this.saveToken(response);
  }

  logAccessToken() {
    console.log('Access Token:', this.accessToken);
  }
}
