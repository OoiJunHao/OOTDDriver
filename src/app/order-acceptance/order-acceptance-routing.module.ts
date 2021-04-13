import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderAcceptancePage } from './order-acceptance.page';

const routes: Routes = [
  {
    path: '',
    component: OrderAcceptancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderAcceptancePageRoutingModule {}
