import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import { ProfileService } from '../../services/user/profile.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

//   service firebase.storage {
//   match /b/{bucket}/o {
// match /{allPaths=**} {
//   allow read, write: if request.auth != null;
// }
// }
// }
public imgArray = new Array();

  public getImageArray() {
      return this.imgArray;
  }
  public addToArray(data: any) { this.imgArray.push(data); }

  // @ts-ignore
  public post(currentImage: any, input: string): Promise<void> {
    const userID = firebase.auth().currentUser.uid;
    this.imgArray.push(currentImage);
    // firebase.storage().ref('images/' + userID + '/' + input).putString(currentImage, 'data_url');
    // let imageRef = firebase.storage().ref('images/' + userID + '/' + input);
    // let uploadTask = imageRef.put(currentImage);
    // console.log('post service reached');
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage().ref('images/' + userID + '/' + input);

      let uploadTask = fileRef.putString(currentImage, 'data_url');
      uploadTask.on(
          'state_changed',
          // tslint:disable-next-line:variable-name
          (_snapshot: any) => {
            console.log(
                'snapshot progess ' +
                (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
            );
          },
          // tslint:disable-next-line:variable-name
          _error => {
            console.log(_error);
            reject(_error);
          },
          () => {
            // completion...
            // @ts-ignore
            resolve(uploadTask.snapshot);
          }
      );
    });
  }

    getImageURLString() {
        const userID = firebase.auth().currentUser.uid;
        let imagesRef = firebase.storage().ref('images/' + userID + '/' + 'hell');
        return imagesRef.toString();
    }

    getUserImages() {
        // let images = Array<any>();
        // const userID = firebase.auth().currentUser.uid;
        // let imagesRef = firebase.storage().ref('images/' + userID );
        // // tslint:disable-next-line:only-arrow-functions
        // imagesRef.getDownloadURL().then(function(url) {
        //     images.push(url);
        // });
        // return images;
    }

    getImageURL(path) {
        // console.log('getImageURL initiated');
        const userID = firebase.auth().currentUser.uid;
        return firebase.storage().ref(path).getDownloadURL();
        //     (data) => {
        //         console.log('hey');
        //         console.log(data);
        //         return data;
        //     }
        // );
        // console.log(imagesRef);
        // return imagesRef.toString();
    }



    getImages() {
      console.log('getImages has been entered');
    // functions.storage.object().onChange()
      const userID = firebase.auth().currentUser.uid;
      let listRef = firebase.storage().ref('images/' + userID);

        // tslint:disable-next-line:only-arrow-functions
      return listRef.listAll();
  }
}
