import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaLoginPageRoutingModule } from './tela-login-routing.module';

import { TelaLoginPage } from './tela-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaLoginPageRoutingModule
  ],
  declarations: [TelaLoginPage]
})
export class TelaLoginPageModule {}
