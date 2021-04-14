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
  feedback: string | null;
  constructor(private router: Router,
    public sessionService: SessionService, public toastController: ToastController) { }

  ngOnInit() {
    this.driver = this.sessionService.getCurrentDriver();
    this.feedback = "";
  }

  async presentToast() {
    
    const toast = await this.toastController.create({
      message: 'Your Request Will Be Processed. Please wait 1 - 3 days.',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  async presentFeedbackToast(driverFeedbackForm: NgForm) {
    
    console.log(`feedback = ${this.feedback}`);
    const welcomeToast = await this.toastController.create({
      message: 'Thank you for your hardwork. Here are your earnings! OOTDFood appreciates you!',
      duration: 2500,
      position: "top"
    });
    welcomeToast.present().then(()=>{this.feedback=""});
  }


  



  

}
