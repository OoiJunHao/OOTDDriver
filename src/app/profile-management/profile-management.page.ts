import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Driver } from '../models/driver';
import { ProfileModalPage } from '../profile-modal/profile-modal.page';
import { DriverService } from '../services/driver.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.page.html',
  styleUrls: ['./profile-management.page.scss'],
})
export class ProfileManagementPage implements OnInit {

  currentDriver: Driver;
  driverToUpdate: Driver;

  constructor(private sessionService: SessionService, private driverService: DriverService, private modalController: ModalController,) {

  }

  ngOnInit() {
    this.currentDriver = this.sessionService.getCurrentDriver();
    console.log(this.currentDriver.profilePicture);
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
}
