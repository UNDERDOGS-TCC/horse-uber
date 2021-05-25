import { Component, OnInit, NgZone } from '@angular/core';
import {
  Environment,
  Geocoder,
  GoogleMap,
  GoogleMapOptions,
  GoogleMaps,
  GoogleMapsAnimation,
  GoogleMapsEvent,
  ILatLng,
  Marker,
  Polyline,
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { TripData } from '../interfaces/tripData';
import { ToastController } from '@ionic/angular';

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
  public toGoClicked: string = 'Para onde você vai?';
  private originMarker: Marker;
  public line: Polyline;
  private markerDestination: Marker;
  public destination: any;
  private googleDirectionService = new google.maps.DirectionsService();
  private userBalanceRide: string;
  private userStarsRide: string;
  public selectedTripValue: string; public valueBlack: string; public valueConfort: string; public valueHorseX: string; public tripType: string;

  constructor(private platform: Platform, private geolocation: Geolocation, private ngZone: NgZone, public toastController: ToastController) {

  }

  async ngOnInit() {
    await this.platform.ready();
    this.loadMap();

    const horseX = document.getElementById("horseX");
    const hConfort = document.getElementById("hConfort");
    const hBlack = document.getElementById("hBlack");

    horseX.addEventListener('click', SelectHorseX);
    hConfort.addEventListener('click', SelecthConfort);
    hBlack.addEventListener('click', SelecthBlack);
  }

  async loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyBykKVB2RUB2ZbdcBz8d2Ooa6dyuyER9OM',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyBykKVB2RUB2ZbdcBz8d2Ooa6dyuyER9OM',
    });

    let mapOptions: GoogleMapOptions = {
      controls: {
        zoom: false,
      },
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
      await this.geolocation
        .getCurrentPosition({
          maximumAge: 1000,
          timeout: 5000,
          enableHighAccuracy: true,
        })
        .then((localizacao) => {
          this.minhaLatitude = localizacao.coords.latitude;
          this.minhaLongitude = localizacao.coords.longitude;
        });

      await this.map.moveCamera({
        target: {
          lat: this.minhaLatitude,
          lng: this.minhaLongitude,
        },
        zoom: 18,
      });

      this.originMarker = this.map.addMarkerSync({
        title: 'Você',
        icon: '#ADA388',
        animation: GoogleMapsAnimation.DROP,
        position: {
          lat: this.minhaLatitude,
          lng: this.minhaLongitude,
        },
      });

      const g: any = await Geocoder.geocode({
        position: {
          lat: this.minhaLatitude,
          lng: this.minhaLongitude,
        },
      });

      this.actualClicked = g[0].extra.lines;
    } catch (error) {
      console.log(error);
    }
  }

  actualLocationChanged() {
    if (!this.actualLocation.trim().length) return;

    this.autoComplete.getPlacePredictions(
      { input: this.actualLocation },
      (predictions) => {
        this.ngZone.run(() => {
          this.searchResultsActual = predictions;
        });
      }
    );
  }

  async selectActualPoint(item: any) {
    this.actualLocation = '';
    this.actualClicked = item.description;

    const actualInfo: any = await Geocoder.geocode({
      address: item.description,
    });
    this.originMarker.setPosition(actualInfo[0].position);

    await this.map.moveCamera({
      target: {
        lat: actualInfo[0].position.lat,
        lng: actualInfo[0].position.lng,
      },
      zoom: 18,
    });
  }

  toGoLocationChanged() {

    if (!this.toGoLocation.trim().length) return;
    this.autoComplete.getPlacePredictions(
      { input: this.toGoLocation },
      (predictions) => {
        this.ngZone.run(() => {
          this.searchResultsToGo = predictions;
        });
      }
    );
  }

  async selectToGoPoint(item: any) {
    this.toGoLocation = '';
    this.toGoClicked = item.description;

    this.destination = item;

    const info: any = await Geocoder.geocode({
      address: this.destination.description,
    });


      this.markerDestination = this.map.addMarkerSync({
        title: this.destination.description,
        icon: '#ADA388',
        animation: GoogleMapsAnimation.DROP,
        position: info[0].position,
      });


    this.googleDirectionService.route(
      {
        origin: this.originMarker.getPosition(),
        destination: this.markerDestination.getPosition(),
        travelMode: 'DRIVING',
      },
      async (results) => {
        const points = new Array<ILatLng>();
        const routes = results.routes[0].overview_path;
        for (let i = 0; i < routes.length; i++) {
          points[i] = {
            lat: routes[i].lat(),
            lng: routes[i].lng(),
          };
        }

        this.line = await this.map.addPolyline({
          points: points,
          color: '#ADA388',
          width: 3,
        });

        const rideData = results.routes[0].legs[0];
        var distancia = rideData.distance.value;
        var tempo = Math.round(rideData.duration.value / 60);

        this.valueHorseX = (distancia * 0.01).toString();
        this.valueConfort = (parseFloat(this.valueHorseX) * 1.2).toString();
        this.valueBlack = (parseFloat(this.valueHorseX) * 1.4).toString();

        this.valueHorseX = parseFloat(this.valueHorseX).toFixed(2).toString().replace('.', ',');
        this.valueConfort = parseFloat(this.valueConfort).toFixed(2).toString().replace('.', ',');
        this.valueBlack = parseFloat(this.valueBlack).toFixed(2).toString().replace('.', ',');

        const horseX = document.getElementById("horseX");
        const hConfort = document.getElementById("hConfort");
        const hBlack = document.getElementById("hBlack");

        horseX.classList.add('active');
        hConfort.classList.remove('active');
        hBlack.classList.remove('active');

        this.selectedTripValue = this.valueHorseX;
        this.tripType = 'HorseX';

        this.map.moveCamera({ target: points });
        this.map.panBy(0, 100);
      }
    );
  }

  calcularRota() {
    const userID = firebase.default.auth().currentUser.uid;
    const ourDataBaseUsers = firebase.default.database().ref('users');

    ourDataBaseUsers.on('value', (snapshot) => {
      const data = snapshotToArray(snapshot).filter((r) => r.uid === userID);
      if (data.length != 0) {
        this.userBalanceRide = data[0].userBalance;
        this.userStarsRide = data[0].userStars;
      }
    });

    if (parseFloat(this.userBalanceRide) >= parseFloat(this.selectedTripValue)) {
        this.userBalanceRide = (parseFloat(this.userBalanceRide) - parseFloat(this.selectedTripValue)).toFixed(2).toString();
        this.userBalanceRide = this.userBalanceRide.replace('.', ',');
        this.userStarsRide = (parseFloat(this.userStarsRide) + 0.5).toFixed(2).toString();

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var rideDate = dd + '/' + mm + '/' + yyyy;

        var date = new Date();
        var singleMinute = ('0' + date.getMinutes()).slice(-2);
        var singleHour = ('0' + date.getHours()).slice(-2);
        var rideHour = singleHour + ':' + singleMinute;

        const ourDataBaseRides = firebase.default.database().ref('rides');
        const tripData = {
          destination_ride: this.toGoClicked.toString(),
          trip_type: this.tripType,
          origin_ride: this.actualClicked.toString(),
          ride_date: rideDate.toString(),
          ride_hour: rideHour.toString(),
          ride_value: 'R$ ' + this.selectedTripValue,
          uid: userID.toString(),
        } as TripData;
        ourDataBaseRides.push(tripData).toJSON();


        ourDataBaseUsers.on('value', (snapshot) => {
          const data = snapshotToArray(snapshot).filter(r => r.uid === userID);
          const ourDataBaseUsers = firebase.default.database().ref('users/' + data[0].key).set({
            uid: data[0].uid,
            userName: data[0].userName,
            userBalance: this.userBalanceRide,
            userStars: this.userStarsRide,
            userPictureUrl: data[0].userPictureUrl
          });
        });
        this.presentToast('Corrida realizada!!! Valor final: R$ '+ this.selectedTripValue +'! \n Seu saldo é R$' + this.userBalanceRide + '! \n Por sua corrida bem sucedida, você ganhou 0.5 estrelas!', 6000);
    }else{
      this.presentToast('Você não possui saldo suficiente para realizar a corrida.', 2000);
    }
  }

  async presentToast(message: string, timer: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: timer,
    });
    toast.present();
  }

  voltar(){
    this.ngZone.run(() => {
        this.map.clear();
        this.destination = null;
        this.toGoClicked = 'Para onde você vai?';
        this.addOriginMarker();
    });
  }

  selecionarX(){
    this.selectedTripValue = this.valueHorseX;
    this.tripType = 'HorseX';
  }

  selecionarConfort(){
    this.selectedTripValue = this.valueConfort;
    this.tripType = 'Confort';
  }

  selecionarBlack(){
    this.selectedTripValue = this.valueBlack;
    this.tripType = 'Black';
  }
}


const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};

function SelectHorseX(){
  const horseX = document.querySelector('#horseX');
  const hConfort = document.querySelector('#hConfort');
  const hBlack = document.querySelector('#hBlack');

  horseX.classList.add('active');
  hConfort.classList.remove('active');
  hBlack.classList.remove('active');

  return horseX;
}

function SelecthConfort(){
  const horseX = document.querySelector('#horseX');
  const hConfort = document.querySelector('#hConfort');
  const hBlack = document.querySelector('#hBlack');

  horseX.classList.remove('active');
  hConfort.classList.add('active');
  hBlack.classList.remove('active');

  return hConfort;
}

function SelecthBlack(){
  const horseX = document.querySelector('#horseX');
  const hConfort = document.querySelector('#hConfort');
  const hBlack = document.querySelector('#hBlack');

  horseX.classList.remove('active');
  hConfort.classList.remove('active');
  hBlack.classList.add('active');

  return hBlack;
}
