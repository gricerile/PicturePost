import { Component } from '@angular/core';
// @ts-ignore
import { PostService } from '../services/user/post.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public imageRefsArray: any;

  constructor(private post: PostService, ) {
    this.imageRefsArray = [];
    this.loadImages();
  }

  loadImages() {
    this.post.getAllUserImages().then(
        // function(image) {
        (result) => {
          // console.log(result);
          for (let user of result.prefixes) {
            // @ts-ignore
            let userPath = firebase.storage().ref(user.location.path_);
            // @ts-ignore
            // console.log(userPath.location.path_);
            // @ts-ignore
            firebase.storage().ref(userPath.location.path_).listAll().then( (result) => {
              console.log(result);
              for ( let image of result.items) {
                // @ts-ignore
                let url = firebase.storage().ref(image.location.path_).getDownloadURL();
                console.log(url);
                this.imageRefsArray.push(url);
              }
            });
          }
          console.log(this.imageRefsArray);
        });
  }

}
