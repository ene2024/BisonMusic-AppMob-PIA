import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  userData: any;
  searchResults: any[] = [];
  private searchTerms = new Subject<string>();

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.spotifyService.search(term))
    ).subscribe(results => {
      this.searchResults = results;
      console.log('Search Results:', this.searchResults);
    });

    this.spotifyService.getUserData().subscribe(data => {
      this.userData = data;
      console.log('User Data:', this.userData);
    });
  }

  search(event: any) {
    const term = event.target.value;
    if (term.trim() === '') {
      this.searchResults = [];
    } else {
      this.searchTerms.next(term);
    }
  }
}
