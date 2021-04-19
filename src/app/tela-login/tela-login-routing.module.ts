import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaLoginPage } from './tela-login.page';

const routes: Routes = [
  {
    path: '',
    component: TelaLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaLoginPageRoutingModule {}
