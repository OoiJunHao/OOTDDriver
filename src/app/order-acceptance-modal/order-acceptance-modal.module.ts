import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OrderAcceptanceModalPageRoutingModule } from './order-acceptance-modal-routing.module';

import { OrderAcceptanceModalPage } from './order-acceptance-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderAcceptanceModalPageRoutingModule,
  ],
  declarations: [OrderAcceptanceModalPage]
})
export class OrderAcceptanceModalPageModule {}
