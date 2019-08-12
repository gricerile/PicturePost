import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

public imgArray = new Array();

  public getImageArray() {
      return this.imgArray;
  }
  public addToArray(data: any) { this.imgArray.push(data); }

  // @ts-ignore
  public post(currentImage: any, input: string): Promise<void> {
    const userID = firebase.auth().currentUser.uid;
    this.imgArray.push(currentImage);
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

    getImageURL(path) {
        // console.log('getImageURL initiated');
        const userID = firebase.auth().currentUser.uid;
        return firebase.storage().ref(path).getDownloadURL();
    }



    getImages() {
      console.log('getImages has been entered');
      // gets all of a single user's images
    // functions.storage.object().onChange()
      const userID = firebase.auth().currentUser.uid;
      let listRef = firebase.storage().ref('images/' + userID);

        // tslint:disable-next-line:only-arrow-functions
      return listRef.listAll();
  }

    getAllUserImages() {
      // get list of all paths to every user
        let listRef = firebase.storage().ref('images');
        return listRef.listAll();
    }
}
