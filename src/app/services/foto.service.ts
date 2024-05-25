import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Photo } from '../model/foto.model';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  public photos: Photo[] =[];

  constructor() { }

  public async addNewToGallery() {
    
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    
    this.photos.unshift({
      filepath: '',
      webViewPath: capturedPhoto.webPath
    });
  }


}
