import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderAcceptancePageRoutingModule } from './order-acceptance-routing.module';
import { OrderAcceptanceModalPage } from '../order-acceptance-modal/order-acceptance-modal.page'
import { OrderAcceptancePage } from './order-acceptance.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderAcceptancePageRoutingModule,
  ],
  declarations: [OrderAcceptancePage]
})
export class OrderAcceptancePageModule {}
