import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  pages : any;
  constructor()
  {
    this.sideMenu();
  }

  sideMenu()
  {
    this.pages =
    [
      {
        title: "Mensagens",
        url: "",
      },
      {
        title: "Seja Um Cavaleiro",
        url: "/ganhe-dinheiro-cavalgando",
      },
      {
        title: "Suas Viagens",
        url: "/your-trips",
      },
      {
        title: "Pagamentos",
        url: "/payments",
      },
      {
        title: "Ajuda",
        url: "",
      },
      {
        title: "Configurações",
        url: "",
      },
      {
        title: "Sair",
        url: "/tela-login",
      },
    ]
  }
}
