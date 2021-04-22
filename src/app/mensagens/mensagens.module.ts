import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensagensPageRoutingModule } from './mensagens-routing.module';

import { MensagensPage } from './mensagens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensagensPageRoutingModule
  ],
  declarations: [MensagensPage]
})
export class MensagensPageModule {}
