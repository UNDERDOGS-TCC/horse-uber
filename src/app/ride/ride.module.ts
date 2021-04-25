import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidePageRoutingModule } from './ride-routing.module';

import { RidePage } from './ride.page';

import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidePageRoutingModule
  ],
  declarations: [
    RidePage,
    HeaderComponent,
    MenuComponent
  ]
})
export class RidePageModule {}
