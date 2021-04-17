import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Driver } from '../models/driver';
import { ProfileModalPage } from '../profile-modal/profile-modal.page';
import { DriverService } from '../services/driver.service';
import { SessionService } from '../services/session.service';
import { ImagePickerService } from '../services/image-picker.service';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.page.html',
  styleUrls: ['./profile-management.page.scss'],
})
export class ProfileManagementPage implements OnInit {

  currentDriver: Driver;
  driverToUpdate: Driver;
  profilePicture: string;

  constructor(private sessionService: SessionService, private driverService: DriverService, private modalController: ModalController, private imagePickerService: ImagePickerService, private imagePicker: ImagePicker, private webView: WebView, private base64: Base64) {
  }

  ngOnInit() {
    this.currentDriver = this.sessionService.getCurrentDriver();
    this.imagePickerService.retrieveProfilePicture(String(this.currentDriver.driverId)).subscribe(response => {
      this.profilePicture = response.base64Code;
      console.log(this.profilePicture);
    },
      error => {
        console.log(error);
      })

  }

  async updateDetails() {
    console.log("updating");
    this.driverToUpdate = new Driver();

    const profileModal = await this.modalController.create({
      component: ProfileModalPage,
    });

    profileModal.onDidDismiss().then((event) => {
      if (event.data.toUpdateDriver) {
        let toUpdateDriver = event.data.toUpdateDriver;
        // toUpdateDriver.password = this.currentDriver.password;
        console.log(toUpdateDriver);
        this.driverService.updateDriver(toUpdateDriver).subscribe(
          response => {
            console.log(response);
            this.sessionService.setCurrentDriver(response);
            this.currentDriver = response;
            this.updateSuccess();
          },
          error => {
            this.updateFailure();
          }
        );
      }
    });
    return await profileModal.present();
  }

  async updateSuccess() {
    const toast = document.createElement('ion-toast');
    toast.message = "Update is Successful";
    toast.position = "top";
    toast.duration = 2000;
    toast.style.textAlign = "center";

    document.body.appendChild(toast);
    return toast.present();
  }

  async updateFailure() {
    const toast = document.createElement('ion-toast');
    toast.message = "Update is unsuccessful";
    toast.position = "top";
    toast.duration = 2000;
    toast.style.textAlign = "center";

    document.body.appendChild(toast);
    return toast.present();
  }

  updateImage() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      outputType: 1, // dunno why this doesnt work, pls report to cordova....
      quality: 100
    }

    this.imagePicker.getPictures(options).then((imageData) => {
      for (var i = 0; i < imageData.length; i++) {
        this.base64.encodeFile(imageData[i]).then((base64File: string) => {
          this.imagePickerService.uploadImage(this.sessionService.getCurrentDriver().driverId.toString(), base64File).subscribe(
            res => {
              this.ngOnInit();
              this.updateSuccess()
            } ,
            err => {
              console.log(err)
              this.updateFailure();
            });
        }, (err) => {
          console.log(err);
          this.updateFailure();
        });

        // var imagePath = imageData[i].substr(0, imageData[i].lastIndexOf('/') + 1);
        // var imageName = imageData[i].substr(imageData[i].lastIndexOf('/') + 1);
        // console.log('File.readAsDataURL: imagePath: ' + imagePath);
        // console.log('File.readAsDataURL: imageName: ' + imageName);
        // File.readAsDataURL(imagePath, imageName).then((b64str) => {
        //   console.log('Image B64 URL: ' + b64str);
        //   function loadImage(src, callback) {
        //     var img = new Image();
        //     img.onload = callback;
        //     img.setAttribute('crossorigin', 'anonymous'); // works for me
        //     img.src = src;
        //     return img;
        // }
        // function encodeImageUri(imageUri, callback) {
        //   var c = document.createElement('canvas');
        //   var ctx = c.getContext("2d");
        //   var img = new Image();
        //   img.setAttribute('crossorigin', 'anonymous'); // works for me
        //   img.onload = function () {
        //     var aux:any = this;
        //     c.width = aux.width;
        //     c.height = aux.height;
        //     ctx.drawImage(img, 0, 0);
        //     var dataURL = c.toDataURL("image/jpeg");
        //     callback(dataURL);
        //   };
        //   img.src = imageUri;
        // };
        // encodeImageUri(this.webView.convertFileSrc(imageData[i]), function(base64) {
        //   console.log(base64);
        // }) 
        // toDataUrl(this.webView.convertFileSrc(imageData[i]), function (myBase64) {
        //   console.log(myBase64); // myBase64 is the base64 string
        // });
      }
    }, (err) => {
      console.log("Gallery issue: " + err);
    });
  }


}
