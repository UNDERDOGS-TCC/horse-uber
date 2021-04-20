import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  /*navigate: any;

  constructor() {
    this.sideMenu();
  }

  sideMenu() {
    this.navigate =
      [
        {
          title: "Mensagens",
          url: "",
        },
        {
          title: "Ganhe Dinheiro Cavalgando",
          url: "",
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
  }*/

  navigate : any;
  constructor(private menu: MenuController)
  {
    this.sideMenu();
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title: "Mensagens",
        url: "",
      },
      {
        title: "Ganhe Dinheiro Cavalgando",
        url: "",
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
