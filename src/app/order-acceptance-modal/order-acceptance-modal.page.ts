import { Component, Input, OnInit } from '@angular/core';
import { SaleTransaction } from '../models/sale-transaction';
import { ModalController, NavParams } from '@ionic/angular';
import { SaleTransactionLine } from '../models/sale-transaction-line';
@Component({
  selector: 'app-order-acceptance-modal',
  templateUrl: './order-acceptance-modal.page.html',
  styleUrls: ['./order-acceptance-modal.page.scss'],
})
export class OrderAcceptanceModalPage implements OnInit {

  @Input() value: SaleTransaction;
  saleTransactionLineItems : SaleTransactionLine[]

  constructor(public navParams: NavParams, public modalController : ModalController) { }

  ngOnInit() {
    this.saleTransactionLineItems = this.value.saleTransactionLineItemEntities;
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
