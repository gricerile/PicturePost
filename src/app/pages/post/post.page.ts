import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PostService } from '../../services/user/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})

export class PostPage implements OnInit {

  currentImage: any;
  input: string;

  constructor(private camera: Camera) { }

  ngOnInit() {
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      // console.log(imageData);
    }, (err) => {
      // Handle error
      // console.log('Camera issue:' + err);
    });
  }

  postPhoto() {
    // console.log('Post Function was called.');
    // this.input = document.getElementById('input').nodeValue;
    console.log(this.input);
     // tslint:disable-next-line:triple-equals
    if (this.input != '' || this.input != null) {
    PostService.post(this.currentImage, this.input);
     }
  }

  deletePhoto() { this.currentImage = null; }
}
