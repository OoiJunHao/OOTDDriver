import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Driver } from '../models/driver';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.page.html',
  styleUrls: ['./profile-modal.page.scss'],
})
export class ProfileModalPage implements OnInit {

  currentDriver: Driver;
  driverHolder: Driver = new Driver;

  // username: string;
  // password: string;
  firstname: string;
  lastName: string;
  profilePicture: string;
  age: number;

  constructor(private modalController: ModalController,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
    this.currentDriver = this.sessionService.getCurrentDriver();
  }

  public updateDriverModal() {
    if (this.currentDriver.firstname.length > 32 || this.currentDriver.lastName.length > 32) {
      this.nameLengthError();
      return false;
    } // TO ADD MORE VALIDATION CHECKS

    this.modalController.dismiss({
      'toUpdateDriver': this.currentDriver
    });
  }

  public closeModal() {
    this.modalController.dismiss();
  }

  async nameLengthError() {
    const toast = document.createElement('ion-toast');
    toast.message = "Length Of First/Last Name Is Too Long, Keep It Within 32 Characters!";
    toast.position = "top";
    toast.duration = 2000;
    toast.style.textAlign = "center";

    document.body.appendChild(toast);
    return toast.present();
  }

  async passwordLengthError() {
    const toast = document.createElement('ion-toast');
    toast.message = "Password Need To Be Kept Between 6 To 16 Characters!";
    toast.position = "top";
    toast.duration = 2000;
    toast.style.textAlign = "center";

    document.body.appendChild(toast);
    return toast.present();
  }

}
