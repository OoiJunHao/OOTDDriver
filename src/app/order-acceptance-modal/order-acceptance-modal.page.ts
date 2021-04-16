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

  public closeModal()
	{
		 this.modalController.dismiss();
	}

}
