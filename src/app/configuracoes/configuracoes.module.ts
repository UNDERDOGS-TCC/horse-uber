import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracoesPageRoutingModule } from './configuracoes-routing.module';
import { ConfiguracoesPage } from './configuracoes.page';

import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracoesPageRoutingModule
  ],
  declarations: [
    ConfiguracoesPage,
    HeaderComponent,
    MenuComponent
  ]
})
export class ConfiguracoesPageModule {}
