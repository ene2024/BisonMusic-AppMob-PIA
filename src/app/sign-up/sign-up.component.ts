import { Component, OnInit } from '@angular/core';
import { addDoc, collection } from "firebase/firestore";
import { getFirestore, doc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { SpotifyService } from '../services/spotify.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  userData: any;
  message = '';

  constructor(private _spotifyService: SpotifyService, private toastController: ToastController) {}

  ngOnInit() {
    this._spotifyService.getUserData().subscribe(data => {
      this.userData = data;
      console.log('User Data:', this.userData);
    });
  }

  firestore = getFirestore(initializeApp(environment.firebaseConfig));
  musicApp = collection(this.firestore, 'suggestions');

  async addDocument() {    
    try {
      await addDoc(this.musicApp, {
        user: this.userData.display_name,
        email: this.userData.email,
        message: this.message
      });
      this.showToast('Thank you for your suggestion!', 'success');
    } catch (e) {
      console.error('Error adding document: ', e);
      this.showToast('There was an error sending your suggestion. Please try again.', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}
