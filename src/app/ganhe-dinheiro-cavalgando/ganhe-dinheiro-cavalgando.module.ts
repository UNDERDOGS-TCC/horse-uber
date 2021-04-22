import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GanheDinheiroCavalgandoPageRoutingModule } from './ganhe-dinheiro-cavalgando-routing.module';
import { GanheDinheiroCavalgandoPage } from './ganhe-dinheiro-cavalgando.page';

import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GanheDinheiroCavalgandoPageRoutingModule
  ],
  declarations: [
    GanheDinheiroCavalgandoPage,
    HeaderComponent
  ]
})
export class GanheDinheiroCavalgandoPageModule {}
