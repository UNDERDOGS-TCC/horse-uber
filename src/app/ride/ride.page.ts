import { Component, OnInit, NgZone } from '@angular/core';
import { Environment, Geocoder, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsAnimation, GoogleMapsEvent, ILatLng, Marker, Polyline } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import * as moment from 'moment';

declare var google: any;

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  [x: string]: any;
  map: GoogleMap;
  public actualLocation: string = '';
  public toGoLocation: string = '';
  private autoComplete = new google.maps.places.AutocompleteService();
  public searchResultsActual = new Array<any>();
  public searchResultsToGo = new Array<any>();
  public actualClicked: string = 'Onde você está?';
  public toGoClicked: string = 'Para Onde você vai?';
  private originMarker: Marker;
  public line: Polyline;
  private markerDestination: Marker;
  public destination: any;
  public removeLine: boolean = false;
  private googleDirectionService = new google.maps.DirectionsService();
  private geocoder = new google.maps.Geocoder();

  constructor(private platform: Platform, private geolocation: Geolocation, private ngZone: NgZone) { }

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

      this.originMarker = this.map.addMarkerSync({
        title: 'Você',
        icon: '#ADA388',
        animation: GoogleMapsAnimation.DROP,
        position: {
          lat: this.minhaLatitude,
          lng: this.minhaLongitude
        }
      });

      const g: any = await Geocoder.geocode({ position : {
        lat: this.minhaLatitude,
        lng: this.minhaLongitude
       }});

      this.actualClicked = g[0].extra.lines;

    } catch (error) {
      console.log(error);
    }
  }

  actualLocationChanged() {
    if (!this.actualLocation.trim().length) return;

    this.autoComplete.getPlacePredictions({ input: this.actualLocation }, predictions => {
      this.ngZone.run(() => {
        this.searchResultsActual = predictions;
      });
    });
  }

  async selectActualPoint(item: any) {
    this.actualLocation = '';
    this.actualClicked = item.description;

    const actualInfo: any = await Geocoder.geocode({ address: item.description })
    this.originMarker.setPosition(actualInfo[0].position)

    if (this.removeLine == true){
      this.line.remove();

      this.googleDirectionService.route({
        origin: this.originMarker.getPosition(),
        destination: this.markerDestination.getPosition(),
        travelMode: 'DRIVING'
      }, async results =>{
        const points = new Array<ILatLng>();
        const routes = results.routes[0].overview_path;
        for(let i = 0; i < routes.length; i++){
          points[i] = {
            lat: routes[i].lat(),
            lng: routes[i].lng()
          }
        }

        this.line = await this.map.addPolyline({
          points: points,
          color: '#ADA388',
          width: 3
        });

        this.map.moveCamera({
          target: points
        });
      });
    }

    await this.map.moveCamera({
      target: {
        lat: actualInfo[0].position.lat,
        lng: actualInfo[0].position.lng
      },
      zoom: 18
    });
  }

  toGoLocationChanged() {

    if (this.removeLine == true){
      this.line.remove();
    }

    if (!this.toGoLocation.trim().length) return;
    this.autoComplete.getPlacePredictions({ input: this.toGoLocation }, predictions => {
      this.ngZone.run(() => {
        this.searchResultsToGo = predictions;
      });
    });
  }

  async selectToGoPoint(item: any) {

    this.toGoLocation = '';
    this.toGoClicked = item.description;

    this.destination = item;

    const info: any = await Geocoder.geocode({ address: this.destination.description })

    if (this.markerDestination == null) {
      this.markerDestination = this.map.addMarkerSync({
        title: this.destination.description,
        icon: '#ADA388',
        animation: GoogleMapsAnimation.DROP,
        position: info[0].position
      });
    } else {
      this.markerDestination.setPosition(info[0].position);
    }

    this.googleDirectionService.route({
      origin: this.originMarker.getPosition(),
      destination: this.markerDestination.getPosition(),
      travelMode: 'DRIVING'
    }, async results =>{
      const points = new Array<ILatLng>();
      const routes = results.routes[0].overview_path;
      for(let i = 0; i < routes.length; i++){
        points[i] = {
          lat: routes[i].lat(),
          lng: routes[i].lng()
        }
      }

      this.line = await this.map.addPolyline({
        points: points,
        color: '#ADA388',
        width: 3
      });
      this.removeLine = true;

      this.map.moveCamera({
        target: points
      });
    });

  }

  calcularRota(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var rideDate = dd + '/' + mm + '/' + yyyy;

    var date = new Date();
    var singleMinute = ('0'+ date.getMinutes()).slice(-2);
    var singleHour = ('0'+ date.getHours()).slice(-2);
    var rideHour = singleHour+':'+singleMinute;

    const userID = firebase.default.auth().currentUser.uid;
    const ourDataBase = firebase.default.database().ref('rides');

    ourDataBase.push().set({
      'destination_ride': this.toGoClicked.toString(),
      'horse_name': 'CAVALÃO',
      'origin_ride': this.actualClicked.toString(),
      'ride_date': rideDate.toString(),
      'ride_hour': rideHour.toString(),
      'ride_value': 'R$ 25,00',
      'uid': userID.toString(),
    });
  }

}
