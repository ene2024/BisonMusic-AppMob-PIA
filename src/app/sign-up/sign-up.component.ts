import { Component, OnInit } from '@angular/core';
import { addDoc, collection } from "firebase/firestore";
import { getFirestore, doc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {

  userData: any;
  message = '';

  constructor( private _spotifyService: SpotifyService) { }


  ngOnInit() {
    this._spotifyService.getUserData().subscribe(data => {
      this.userData = data;
      console.log('User Data:', this.userData);
    });
  }

  firestore = getFirestore(initializeApp(environment.firebaseConfig));

  musicApp = collection(this.firestore, 'suggestions');

  addDocument(){    
    const newDoc = addDoc(this.musicApp, {
      user: this.userData.display_name,
      email: this.userData.email,
      messsage: this.message
    })
  };

}
