import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-your-trips',
  templateUrl: './your-trips.page.html',
  styleUrls: ['./your-trips.page.scss'],
})
export class YourTripsPage implements OnInit {
  rides: any;

  constructor(public http: HttpClient) {
    this.getData();
  }

  getData() {
    this.http
      .get(
        'https://my-json-server.typicode.com/CaiqueSobral/horse_uberjsontestes/rides'
      )
      .subscribe(
        (data) => {
          this.rides = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit() {}
}
