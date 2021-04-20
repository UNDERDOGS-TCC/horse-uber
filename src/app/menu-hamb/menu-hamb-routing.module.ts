import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuHambPage } from './menu-hamb.page';

const routes: Routes = [
  {
    path: '',
    component: MenuHambPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuHambPageRoutingModule {}
