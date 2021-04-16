import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SaleTransaction } from '../models/sale-transaction';
import { ModalController, NavParams } from '@ionic/angular';
import { SaleTransactionLine } from '../models/sale-transaction-line';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-order-acceptance-modal',
  templateUrl: './order-acceptance-modal.page.html',
  styleUrls: ['./order-acceptance-modal.page.scss'],
})
export class OrderAcceptanceModalPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() value: SaleTransaction;
  saleTransactionLineItems : SaleTransactionLine[]

  constructor(public navParams: NavParams, public modalController : ModalController) { }

  ngOnInit() {
    this.saleTransactionLineItems = this.value.saleTransactionLineItemEntities;
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }



  public closeModal()
	{
		 this.modalController.dismiss({
			 'result': 'refresh'
		 });
	}

  public closeCompletely() {
    this.modalController.dismiss({
      'result': 'close'
    });
  }

  public closeAndChosen() {
    this.modalController.dismiss({
      'result' : 'selected'
    })
  }

}
