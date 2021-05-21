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
  userName: any;
  userStarsCount: any;
  userPictureURL: any;

  constructor(private authService: AuthService)
  {
    this.sideMenu();

    const userID = firebase.default.auth().currentUser.uid;
    const ourDataBase = firebase.default.database().ref('users');

    ourDataBase.on('value', (snapshot) => {
      const data = snapshotToArray(snapshot).filter(r => r.uid === userID);
        this.userName = data[0].userName;
        this.userStarsCount = data[0].userStars;
        this.userPictureURL = data[0].userPictureUrl;
    });
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

const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach(function(childSnapshot) {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};
