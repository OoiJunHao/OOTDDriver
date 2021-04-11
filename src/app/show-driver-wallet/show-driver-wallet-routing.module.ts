import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowDriverWalletPage } from './show-driver-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: ShowDriverWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowDriverWalletPageRoutingModule {}
