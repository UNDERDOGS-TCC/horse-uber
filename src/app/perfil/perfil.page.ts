import { Component, Input, OnInit } from '@angular/core';
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

  constructor() {
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
  }

  handleFiles(){
    let fotoHTML: HTMLInputElement = document.getElementById('fileElem') as HTMLInputElement;
    this.foto = fotoHTML.files[0];
    var storageRef = firebase.default.storage().ref();
    storageRef.child('imagens/'+this.userUid).put(this.foto);
    const newPhoto = storageRef.child('imagens');
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
