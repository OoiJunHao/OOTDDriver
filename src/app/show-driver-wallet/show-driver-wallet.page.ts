import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver';
import { Platform } from '@ionic/angular';
import { DriverService } from '../services/driver.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-show-driver-wallet',
  templateUrl: './show-driver-wallet.page.html',
  styleUrls: ['./show-driver-wallet.page.scss'],
})
export class ShowDriverWalletPage implements OnInit {
  
  driver: Driver;
  constructor(private router: Router,
    public sessionService: SessionService, public toastController: ToastController, private driverService: DriverService) { }

  ngOnInit() {
    this.driver = this.sessionService.getCurrentDriver();
  }

  cashOut() {
    // Simulating cashout here
    this.driverService.cashOutEarnings(this.sessionService.getCurrentDriver().driverId).subscribe((res) => {
      this.sessionService.setCurrentDriver(res);
      this.driver = this.sessionService.getCurrentDriver();
      this.presentToast('Your Request Will Be Processed\nPlease wait 1 - 3 days');
    }, (error) => {
      console.log(error);
      this.presentToast('An error has occured\nPlease try again');
    })
  }

  async presentToast(messageToShow: string) {
    const toast = await this.toastController.create({
      message: messageToShow,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }
}