import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  pages: any;

  constructor(private menu: MenuController) {
    this.Hamburguer();
  }

  Hamburguer() {
    this.pages =
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
        }
      ];
  }
}
