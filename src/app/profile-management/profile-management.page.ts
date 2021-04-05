import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Driver } from '../models/driver';
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
  }

  async updateDetails() {
    this.driverToUpdate = new Driver();

    const profileModal = await this.modalController.create({
      component: ProfileModal,
    })
  }

}
