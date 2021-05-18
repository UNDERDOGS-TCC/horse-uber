import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TelaLoginPage } from './tela-login/tela-login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage:any = "TelaLoginPage";

  constructor(private authService: AuthService) {}

  async logout(){
    try{
      await this.authService.logout();
    }catch(error){
      console.error(error);
    }
  }
  
}
