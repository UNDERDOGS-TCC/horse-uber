import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidePage } from './ride.page';

const routes: Routes = [
  {
    path: '',
    component: RidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidePageRoutingModule {}
