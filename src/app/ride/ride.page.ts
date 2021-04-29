import { Component, OnInit } from '@angular/core';
import { Environment, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsAnimation, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  [x: string]: any;
  map: GoogleMap;
  constructor(private platform: Platform, private geolocation: Geolocation) { }

  async ngOnInit() {
    await this.platform.ready();
    this.loadMap();
  }

  async loadMap() {

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBykKVB2RUB2ZbdcBz8d2Ooa6dyuyER9OM',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBykKVB2RUB2ZbdcBz8d2Ooa6dyuyER9OM'
    });

    let mapOptions: GoogleMapOptions = {
      controls: {
        zoom: false
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    try {
      await this.map.one(GoogleMapsEvent.MAP_READY);

      this.addOriginMarker();
    } catch (error) {
      console.log(error);
    }
  }

  async addOriginMarker() {

    try {
      await this.geolocation.getCurrentPosition({
        maximumAge: 1000, timeout: 5000,
        enableHighAccuracy: true
      }).then((localizacao) => {
        this.minhaLatitude = localizacao.coords.latitude;
        this.minhaLongitude = localizacao.coords.longitude;
      });

      await this.map.moveCamera({
        target: {
          lat: this.minhaLatitude,
          lng: this.minhaLongitude
        },
        zoom: 18
      });

      this.map.addMarkerSync({
        title: 'Você',
        icon: '#ADA388',
        animation: GoogleMapsAnimation.DROP,
        position: {
          lat: this.minhaLatitude,
          lng: this.minhaLongitude
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

}
