import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuHambPageRoutingModule } from './menu-hamb-routing.module';
import { MenuHambPage } from './menu-hamb.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuHambPage,
    children:[
      {
        path: 'your-trips',
        loadChildren: '/your-trips/YourTripsPageModule'
      },
      {
        path: 'payments',
        loadChildren: '/payments/PaymentsPageModule'
      }
    ]
  },
  {
    path:'',
    redirectTo: '/make-a-ride'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuHambPageRoutingModule
  ],
  declarations: [MenuHambPage]
})
export class MenuHambPageModule {}
