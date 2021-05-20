import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  pages : any;
  userName: any = firebase.default.auth().currentUser.displayName;

  constructor(private authService: AuthService)
  {
    this.sideMenu();
  }

  sideMenu()
  {
    this.pages =
    [
      {
        title: "Mensagens",
        url: "/mensagens",
        icon: "document-text-outline",
      },
      {
        title: "Seja Um Cavaleiro",
        url: "/ganhe-dinheiro-cavalgando",
        icon: "id-card-outline",
      },
      {
        title: "Suas Viagens",
        url: "/your-trips",
        icon: "location-outline",
      },
      {
        title: "Pagamentos",
        url: "/payments",
        icon: "cash-outline",
      },
      {
        title: "Ajuda",
        url: "/ajuda",
        icon: "help-outline",
      },
      {
        title: "Configurações",
        url: "/configuracoes",
        icon: "settings-outline",
      },
      {
        title: "Sair",
        url: "/tela-login",
        icon: "exit-outline",
      },
    ]
  }

  async logout(p: any){
    if (p.title == 'Sair'){
      try{
        await this.authService.logout();
      }catch(error){
        console.error(error);
      }
    }
  }
}

