import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeARidePageRoutingModule } from './make-a-ride-routing.module';

import { MakeARidePage } from './make-a-ride.page';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeARidePageRoutingModule,
  ],
  declarations: [
    MakeARidePage,
    HeaderComponent
  ]
})
export class MakeARidePageModule {}
