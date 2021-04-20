import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourTripsPage } from './your-trips.page';

const routes: Routes = [
  {
    path: '',
    component: YourTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourTripsPageRoutingModule {}
