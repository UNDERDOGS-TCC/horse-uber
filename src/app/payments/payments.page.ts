import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  userCash: string = '0,00';
  constructor(public toastController: ToastController) {
    this.getData();
  }

  getData(){
    const userID = firebase.default.auth().currentUser.uid;
    const ourDataBase = firebase.default.database().ref('users');

    ourDataBase.on('value', (snapshot) => {
      const data = snapshotToArray(snapshot).filter(r => r.uid === userID);
      if (data.length != 0){
        this.userCash = data[0].userBalance;
        this.userCash = this.userCash.replace('.',',');
      }
    });
  }

  addCash(){
    this.userCash = (parseFloat(this.userCash) + 25.00).toFixed(2);
    this.userCash = this.userCash.replace('.', ',');

    const userID = firebase.default.auth().currentUser.uid;
    const ourDataBase = firebase.default.database().ref('users');
    ourDataBase.on('value', (snapshot) => {
      const data = snapshotToArray(snapshot).filter(r => r.uid === userID);
      const userDatabase = firebase.default.database().ref('users/' + data[0].key).set({
        uid: data[0].uid,
        userName: data[0].userName,
        userBalance: this.userCash,
        userStars: data[0].userStars,
        userPictureUrl: data[0].userPictureUrl
      });
    });

    this.getData();
    this.presentToast('R$25,00 foram adicionados a seu saldo.');
  }

  ngOnInit() {
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  genericButton() {
    this.presentToast('Em breve');
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
