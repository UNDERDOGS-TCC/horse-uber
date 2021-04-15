import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeARidePage } from './make-a-ride.page';

const routes: Routes = [
  {
    path: '',
    component: MakeARidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeARidePageRoutingModule {}
