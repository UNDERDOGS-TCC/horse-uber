import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMaps, Marker, GoogleMapOptions, GoogleMapsEvent, Environment } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-make-a-ride',
  templateUrl: './make-a-ride.page.html',
  styleUrls: ['./make-a-ride.page.scss'],
})
export class MakeARidePage implements OnInit {
  map: GoogleMap;
  constructor(private platform: Platform) { }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  async ngOnInit() {
    await this.platform.ready();
  }

  loadMap() {

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBykKVB2RUB2ZbdcBz8d2Ooa6dyuyER9OM',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBykKVB2RUB2ZbdcBz8d2Ooa6dyuyER9OM'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
}
