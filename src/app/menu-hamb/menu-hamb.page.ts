import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu-hamb',
  templateUrl: './menu-hamb.page.html',
  styleUrls: ['./menu-hamb.page.scss'],
})
export class MenuHambPage implements OnInit {

  pages = [
    {
      title: 'Mensagens',
      url: ''
    },
    {
      title: 'Ganhe dinheiro cavalgando',
      url: ''
    },
    {
      title: 'Suas Viagens',
      url: '/your-trips'
    },
    {
      title: 'Pagentos',
      url: '/payments'
    },
    {
      title: 'Ajuda',
      url: ''
    },
    {
      title: 'Configurações',
      url: ''
    },
    {
      title: 'Sair',
      url: '/tela-login'
    },
  ];

  SelectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) =>{
      this.SelectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
