import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarContaPage } from './criar-conta.page';

const routes: Routes = [
  {
    path: '',
    component: CriarContaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarContaPageRoutingModule {}
