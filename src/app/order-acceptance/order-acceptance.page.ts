import { Component, OnInit } from '@angular/core';
import { SaleTransaction } from '../models/sale-transaction';
import { OrderAcceptanceServiceService } from '../services/order-acceptance-service.service';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { OrderAcceptanceModalPage } from '../order-acceptance-modal/order-acceptance-modal.page';
import { DriverService } from '../services/driver.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-acceptance',
  templateUrl: './order-acceptance.page.html',
  styleUrls: ['./order-acceptance.page.scss'],
})
export class OrderAcceptancePage implements OnInit {
  searching : boolean;
  found: boolean;
  orderFound : SaleTransaction

  constructor(private orderAcceptanceService: OrderAcceptanceServiceService,
    public modalController : ModalController, private driverService : DriverService, private sessionService : SessionService,
     private toastController: ToastController, private router: Router) { 
  }

  ngOnInit() {
    this.searching = false;
    this.found = false;
  }

  test() {
    this.orderAcceptanceService.retrieveOrder().subscribe(
      response => {
        if (response != null) {
          
          this.found = true; //update progress bar
          this.orderFound = response;
        } 
      }, error => {
        console.log("An error has occured: " + error);
      }
    )
    
    
  }

  back() {
    this.router.navigate(["/index"]);
  }
  onSearch() {
    this.orderAcceptanceService.retrieveOrder().subscribe(
        response => {
        console.log(response);
        this.orderFound = response;
        this.found = true;
        this.presentModal();
      }, error => {
        console.log("An error has occured: " + error);
      }
    )
  
  }

  async presentModal() 
	{
		const modal = await this.modalController.create({
			component: OrderAcceptanceModalPage,
			componentProps: { value: this.orderFound}
		});
		
		modal.onDidDismiss().then((event) => {
			const retVal = event.data.result;
      this.found = false;
      if (retVal == "refresh") {
        this.onSearch();
      } else if (retVal == "selected") {
        this.driverService.addOrderToDriver(1, this.orderFound.user.userId, this.orderFound.saleTransactionId).subscribe( //edit the driverId
          response => {
              this.displaySuccess("saletransaction of Id:" + this.orderFound.saleTransactionId + " is assigned to driverId: ");
          }, error => {
            this.displayError(error);
          }
        )
      }
			console.log('********** From Modal: ' + retVal);
		});

		
		return await modal.present();
  }
  
  async displayError(messageString: string) {
    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      message: messageString,
    });

    await toast.present();
  }
  
  async displaySuccess(messageString : string) {
    const toast = await this.toastController.create({
      color: 'success',
      duration: 2000,
      message: messageString,
    });

    await toast.present();
  }
}
  
  


