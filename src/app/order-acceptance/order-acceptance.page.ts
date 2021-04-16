import { Component, OnInit } from '@angular/core';
import { SaleTransaction } from '../models/sale-transaction';
import { OrderAcceptanceServiceService } from '../services/order-acceptance-service.service';
import { ModalController, NavParams, ToastController, LoadingController, IonRefresher, AlertController } from '@ionic/angular';

import { OrderAcceptanceModalPage } from '../order-acceptance-modal/order-acceptance-modal.page';
import { DriverService } from '../services/driver.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-order-acceptance',
  templateUrl: './order-acceptance.page.html',
  styleUrls: ['./order-acceptance.page.scss'],
})
export class OrderAcceptancePage implements OnInit {
  inDelivery: boolean;
  loading: any;
  searching: boolean;
  found: boolean;
  orderFound: SaleTransaction;

  constructor(private orderAcceptanceService: OrderAcceptanceServiceService,
    public modalController: ModalController, private driverService: DriverService, private sessionService: SessionService,
    private toastController: ToastController, private router: Router, private loadingController: LoadingController,
    private callNumber: CallNumber, private alertController: AlertController) {
    this.found = false;
    this.inDelivery = false;
  }

  ngOnInit() {
    console.log('INIT');
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.render();
    await loading.dismiss();
  }

  async presentDeliveryLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 1000
    });
    await loading.present();
  }

  render() {
    this.inDelivery = false;
    this.found = false;
    this.orderFound = null;
    console.log("****** Entering order acceptance page *********");
    if (this.sessionService.getCurrentDriver().currentDelivery == 0) {
      console.log("Currently not delivering");
      this.orderAcceptanceService.retrieveOrder().subscribe(
        response => {
          console.log(response);
          this.orderFound = response;
          this.found = true;
        }, error => {
          console.log("An error has occured: " + error);
          const toast = document.createElement('ion-toast');
          toast.message = "There are no pending deliveries at the moment";
          toast.position = "bottom";
          toast.duration = 3000;
          toast.style.textAlign = "center";
          toast.style.color = "#ff6054";
          document.body.appendChild(toast);
          toast.present();
        });
    } else {
      console.log("Currently in the middle of delivery\nDelivering sale transaction ID: " + this.sessionService.getCurrentDriver().currentDelivery);
      this.driverService.retrieveCurrentDeliveryTransaction(this.sessionService.getCurrentDriver().driverId).subscribe((response) => {
        this.inDelivery= true;
        this.orderFound = response;
      }, (error) => {
        console.log(error);
        this.displayError(error);
      })
    }
  }

  acceptDelivery() {
    this.driverService.addOrderToDriver(this.sessionService.getCurrentDriver().driverId, this.orderFound.user.userId, this.orderFound.saleTransactionId).subscribe(
      response => {
        console.log("saletransaction of Id:" + this.orderFound.saleTransactionId + " is assigned to driverId: ");
        this.displaySuccess("Successfully accepted delivery order\nPlease ride safe!")
        this.sessionService.setCurrentDriver(response);
        this.inDelivery = true;
        this.presentDeliveryLoading()
      }, error => {
        console.log(error)
        this.displayError("Delivery is no longer available :(\n Searching for new delivery");
        this.presentDeliveryLoading()
      }
    )
  }

  refresh() {
    this.ngOnInit();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Complete Delivery',
      message: 'Have you <strong>successfully</strong> completed this delivery request?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.driverService.completeDelivery(this.sessionService.getCurrentDriver().driverId, this.orderFound.saleTransactionId).subscribe((res) => {
              this.sessionService.setCurrentDriver(res);
              this.ngOnInit();
              this.displaySuccess("Successfully completed delivery");
              this.presentDeliveryLoading();
            }, err => {
              console.log(err);
              this.displayError("An error has occured\nPlease try again");
            })
          }
        }
      ]
    });

    await alert.present();
  }

  callCustomer() {
    this.callNumber.callNumber(String(this.orderFound.user.contactNum), true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  completeDelivery() {
    this.presentAlertConfirm();
  }

  back() {
    this.router.navigate(["/index"]);
  }

  showOrderDetails() {
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: OrderAcceptanceModalPage,
      componentProps: { value: this.orderFound }
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
    toast.onDidDismiss().then(() => this.ngOnInit());
  }

  async displaySuccess(messageString: string) {
    const toast = await this.toastController.create({
      color: 'success',
      duration: 2000,
      message: messageString,
    });

    await toast.present();
  }
}