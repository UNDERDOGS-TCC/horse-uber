import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-your-trips',
  templateUrl: './your-trips.page.html',
  styleUrls: ['./your-trips.page.scss'],
})
export class YourTripsPage implements OnInit {
  rides: any;

  constructor() {
    this.getData();
  }

  getData(){
    const userID = firebase.default.auth().currentUser.uid;
    const ourDataBase = firebase.default.database().ref('rides');

    ourDataBase.on('value', function(snapshot) {
      console.log(snapshotToArray(snapshot));
      this.rides = snapshotToArray(snapshot);
      console.log(this.rides);
    })

  }

  ngOnInit() {}
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
