import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderAcceptanceModalPage } from './order-acceptance-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OrderAcceptanceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderAcceptanceModalPageRoutingModule {}
