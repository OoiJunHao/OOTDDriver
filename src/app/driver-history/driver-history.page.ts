import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver';
import { Platform } from '@ionic/angular';
import { DriverService } from '../services/driver.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { SaleTransaction } from '../models/sale-transaction';

@Component({
  selector: 'app-driver-history',
  templateUrl: './driver-history.page.html',
  styleUrls: ['./driver-history.page.scss'],
})
export class DriverHistoryPage implements OnInit {

  driverId: string;
  driverDeliveryTransactions: SaleTransaction[];
  

  constructor(private router: Router,
    public sessionService: SessionService, private driverService: DriverService) { }

  ngOnInit() {
    this.updateModel
  }

  ionViewWillEnter() {
    this.updateModel();
	}

  updateModel() {
    this.driverId = this.sessionService.getCurrentDriver().driverId.toString();
    console.log(`driverId: ${this.driverId}`);
    this.driverService.retrieveDriverTransactions(this.driverId.toString()).subscribe(
      response => {
        this.driverDeliveryTransactions = response;
      },
      error => {
				console.log('********** DrvierTransactionPage.ts: ' + error);
			}
    );
  }

}
