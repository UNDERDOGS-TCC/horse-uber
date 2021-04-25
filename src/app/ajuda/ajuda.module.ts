import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjudaPageRoutingModule } from './ajuda-routing.module';
import { AjudaPage } from './ajuda.page';

import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjudaPageRoutingModule
  ],
  declarations: [
    AjudaPage,
    HeaderComponent,
    MenuComponent
  ]
})
export class AjudaPageModule {}
