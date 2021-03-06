import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import { PostService } from '../../services/user/post.service';
import * as firebase from 'firebase';
// import any = jasmine.any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  public userProfile: any;
  public birthDate: Date;
  public imageRefsArray: any;

  constructor(
      private alertCtrl: AlertController,
      private authService: AuthService,
      private profileService: ProfileService,
      private router: Router,
      private post: PostService,
  ) {
    this.imageRefsArray = [];
    this.viewAllImages();
  }

  ngOnInit() {
    this.profileService
        .getUserProfile()
        .get()
        .then(userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.birthDate = userProfileSnapshot.data().birthDate;
        });
    // @ts-ignore
    // this.images = this.post.getUserImages();
    // if (this.images.length > 0) {
    //   console.log(this.images[0]);
    // }
  }

  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.router.navigateByUrl('login');
    });
  }

  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Your first name & last name',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updateName(data.firstName, data.lastName);
          },
        },
      ],
    });
    await alert.present();
  }

  updateDOB(birthDate: string): void {
    if (birthDate === undefined) {
      return;
    }
    this.profileService.updateDOB(birthDate);
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService
                .updateEmail(data.newEmail, data.password)
                .then(() => {
                  console.log('Email Changed Successfully');
                })
                .catch(error => {
                  console.log('ERROR: ' + error.message);
                });
          },
        },
      ],
    });
    await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updatePassword(
                data.newPassword,
                data.oldPassword
            );
          },
        },
      ],
    });
    await alert.present();
  }

    viewImage() {
      // console.log('View image initiated');
      // @ts-ignore
      const url = this.post.getImageURL().then(
          (data) => {
                console.log('hey');
                console.log(data);
                const imageDisplay = document.getElementById('test1');
                imageDisplay.setAttribute('src', data);
                return data;
            });
   }

    viewAllImages() {
    console.log('view images has been entered');
      // tslint:disable-next-line:only-arrow-functions
    this.post.getImages().then(
        (result) => {
            // console.log(result);
            for (let item of result.items) {
              // @ts-ignore
              let url = firebase.storage().ref(item.location.path_).getDownloadURL();
              this.imageRefsArray.push(url);
            }
            console.log(this.imageRefsArray);
        });
    }
}
