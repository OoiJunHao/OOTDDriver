import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowDriverWalletPageRoutingModule } from './show-driver-wallet-routing.module';

import { ShowDriverWalletPage } from './show-driver-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowDriverWalletPageRoutingModule
  ],
  declarations: [ShowDriverWalletPage]
})
export class ShowDriverWalletPageModule {}
