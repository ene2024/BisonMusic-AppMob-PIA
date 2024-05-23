import { Component, OnInit } from '@angular/core';
import { addDoc, collection } from "firebase/firestore";
import { getFirestore, doc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../global.service';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {

  constructor(private _globalService: GlobalService, private spotifyService: SpotifyService) { }

  ngOnInit() {}

  addUser={
    name:  "",
    lastName: "",
    user:  "",
    email:  "",
    password:  "",
  }


  firestore = getFirestore(initializeApp(environment.firebaseConfig));

  musicApp = collection(this.firestore, 'users');

  addDocument(){    
    const newDoc = addDoc(this.musicApp, {
      name: this.addUser.name,
      lastName: this.addUser.lastName,
      user: this.addUser.user,
      email: this.addUser.email,
      password: this.addUser.password,
    })
  };

  login() {
    this._globalService.redirectToSpotifyAuthorize();
  }  

}
