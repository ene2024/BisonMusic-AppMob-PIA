import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  userData: any;
  userPlaylists: any[] = [];

  constructor(private spotifyService: SpotifyService, private globalService: GlobalService) { }

  ngOnInit(): void {
    if (this.globalService.isTokenValid()) {
      this.spotifyService.getUserPlaylists().subscribe((data: any) => {
        this.userPlaylists = data.items;
      }, error => {
        console.error('Error fetching user playlists:', error);
      });
    } else {
      console.log('Access token is not valid.');
    }

    this.spotifyService.getUserData().subscribe(data => {
      this.userData = data;
      console.log('User Data:', this.userData);
    });
  }

}
