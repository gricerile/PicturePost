import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { ProfileService } from '../../services/user/profile.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

//   service firebase.storage {
//   match /b/{bucket}/o {
// match /{allPaths=**} {
//   allow read, write: if request.auth != null;
// }
// }
// }


  constructor() { }

  // @ts-ignore
  static post(currentImage: any, input: string): Promise<void> {
    const userID = firebase.auth().currentUser.uid;
    firebase.storage().ref('images/' + userID + '/' + input).putString(currentImage, 'data_url');
    // let imageRef = firebase.storage().ref('images/' + userID + '/' + input);
    // let uploadTask = imageRef.put(currentImage);
    // console.log('post service reached');
  }
}
