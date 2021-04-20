import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarContaPageRoutingModule } from './criar-conta-routing.module';

import { CriarContaPage } from './criar-conta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarContaPageRoutingModule
  ],
  declarations: [CriarContaPage]
})
export class CriarContaPageModule {}
