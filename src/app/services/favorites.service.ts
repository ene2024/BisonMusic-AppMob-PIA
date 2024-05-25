import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private likedSongsSubject = new BehaviorSubject<any[]>([]);
  likedSongs$ = this.likedSongsSubject.asObservable();

  constructor() { }

  addSong(song: any) {
    const currentSongs = this.likedSongsSubject.value;
    if (!currentSongs.some(s => s.id === song.id)) {
      const updatedSongs = [...currentSongs, song];
      this.likedSongsSubject.next(updatedSongs);
    }
  }

  removeSong(songId: string) {
    const currentSongs = this.likedSongsSubject.value;
    const updatedSongs = currentSongs.filter(s => s.id !== songId);
    this.likedSongsSubject.next(updatedSongs);
  }
}
