import { Component, OnInit } from '@angular/core';
import { addDoc, collection } from "firebase/firestore";
import { getFirestore, doc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { docData, getDoc, setDoc } from '@angular/fire/firestore';
import { user } from '@angular/fire/auth';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {


  userData: any;
  constructor( private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.getUserData().subscribe(data => {
      this.userData = data;
      console.log('User Data:', this.userData);
    });
  }

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
  
  logout() {
    localStorage.clear();
    this.userData = null;
    window.location.href = '/';
  }
}