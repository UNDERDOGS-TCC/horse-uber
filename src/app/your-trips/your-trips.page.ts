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
    ourDataBase.get().then((allRides) => {
      if (allRides.exists()) {
        console.log(allRides.val()[4]);
        //console.log(x.filter(r=> r.uid === userID));

        //this.rides = allRides.val().filter(r=> r.uid == userID);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  ngOnInit() {}
}
