import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { FotoService } from '../services/foto.service';
import { Photo } from '../model/foto.model';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  userData: any;
  public photos: Photo[] = this._fotoService.photos;

  constructor( private _spotifyService: SpotifyService, private _fotoService: FotoService) { }

  ngOnInit() {
    this._spotifyService.getUserData().subscribe(data => {
      this.userData = data;
      console.log('User Data:', this.userData);
    });
  }

  logout() {
    localStorage.clear();
    this.userData = null;
    window.location.href = '/';
  }

  addPhotoProfile() {
    this._fotoService.addNewToGallery();
  }
}
