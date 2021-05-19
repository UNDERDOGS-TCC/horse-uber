
import { Component } from '@angular/core';
import { TelaLoginPage } from './tela-login/tela-login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage:any = "TelaLoginPage";

  constructor() {}
}
