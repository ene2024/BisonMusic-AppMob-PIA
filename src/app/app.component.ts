import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { Router, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(/*
    private _location: Location,
    private _router: Router,
    private _SpotifyService: SpotifyService*/
  ){}/* {
    this._SpotifyService.upDateToken();

    function getHashParams(q: string) {
      let hashParams: any = {}, e: RegExpExecArray | null, r = /([^&;=]+)=?([^&;]*)/g;
      while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    this._router.events.subscribe(data => {
      if (data instanceof RoutesRecognized) {
        const URL = this._location.path();
        if (URL.includes('access_token')) {
          let param = getHashParams(URL.split('#')[1]);
          const NewToken = param['access_token'];
          if (NewToken) {
            sessionStorage.setItem('token', NewToken);
            this._SpotifyService.upDateToken();
          }
        }
      }
    });
  }*/

  ngOnInit() {}
}
