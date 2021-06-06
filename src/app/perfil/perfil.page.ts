import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userName: any;
  userStarsCount: any;
  userPictureURL: any;
  userEmail: any;
  corridasNumero: any = 0;
  foto: any;
  userUid: any;

  constructor(private loadingController: LoadingController) {
  }

  ngOnInit() {
    var fileSelect = document.getElementById('editar-foto');
    var fileElem = document.getElementById('fileElem');

    fileSelect.addEventListener(
      'click',
      function (e) {
        if (fileElem) {
          fileElem.click();
        }
        e.preventDefault();
      },
      false
    );

    this.getData();
  }

  getData(){
    const userID = firebase.default.auth().currentUser.uid;
    const ourDataBase = firebase.default.database().ref('users');
    const userEmail = firebase.default.auth().currentUser.email;
    this.userEmail = userEmail;
    this.userUid = userID;

    ourDataBase.on('value', (snapshot) => {
      const data = snapshotToArray(snapshot).filter(r => r.uid === userID);
        this.userName = data[0].userName;
        this.userStarsCount = data[0].userStars;
        this.userPictureURL = data[0].userPictureUrl;
    });

    const ourDataBaseRides = firebase.default.database().ref('rides');
    ourDataBaseRides.on('value', (snapshot) => {
      const data = snapshotToArray(snapshot).filter(r => r.uid === userID);
        this.corridasNumero += data.length;
    });
  }

  setData(){
    const userID = firebase.default.auth().currentUser.uid;
    const ourDataBaseUsers = firebase.default.database().ref('users');
    ourDataBaseUsers.on('value', (snapshot) => {
      const data = snapshotToArray(snapshot).filter(r => r.uid === userID);
      firebase.default.database().ref('users/' + data[0].key).set({
        uid: userID,
        userName: data[0].userName,
        userBalance: data[0].userBalance,
        userStars: data[0].userStars,
        userPictureUrl: this.userPictureURL
      });
    });
  }

  async handleFiles(){
    let fotoHTML: HTMLInputElement = document.getElementById('fileElem') as HTMLInputElement;
    this.foto = fotoHTML.files[0];
    var storageRef = firebase.default.storage().ref('imagens/'+this.userUid);
    storageRef.put(this.foto);
    storageRef.getDownloadURL().then((url) => {
      this.userPictureURL = url.toString();
    });
    this.setData();
    var loading = await this.loadingController.create({message: 'aguarde...'});
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000)
    this.getData();
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
