import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userData: any;
  isLoading = true;
  hasNavigated = false;

  constructor(
    private _globalService: GlobalService, 
    private _spotifyService: SpotifyService,
    private router: Router
  ) {}

  async ngOnInit() {
    const code = this.getAuthorizationCodeFromURL();

    if (code) {
      await this._globalService.getToken(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (this._globalService.isTokenValid()) {
      this._spotifyService.getUserData().subscribe(data => {
        this.userData = data;
        this.isLoading = false;
        console.log('User Data:', this.userData);
         
        if (!this.hasNavigated) {
          this.navigateToDefaultRoute();
          this.hasNavigated = true;
        }
      }, () => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

  private getAuthorizationCodeFromURL(): string | null {
    const url = window.location.href;
    const codeMatch = url.match(/code=([^&]*)/);
    return codeMatch ? codeMatch[1] : null;
  }

  login() {
    this._globalService.redirectToSpotifyAuthorize();
  }

  private navigateToDefaultRoute() {
    this.router.navigate(['/tabs/tab1']);
  }
}