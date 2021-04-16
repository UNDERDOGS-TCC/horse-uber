import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourTripsPageRoutingModule } from './your-trips-routing.module';

import { YourTripsPage } from './your-trips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourTripsPageRoutingModule
  ],
  declarations: [YourTripsPage]
})
export class YourTripsPageModule {}
