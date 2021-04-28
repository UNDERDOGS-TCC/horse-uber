import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from '@ionic/angular';

declare var Connection;

@Injectable()
export class ConnectivityserviceService {

  onDevice: boolean;

  constructor(public platform: Platform) {
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if (this.onDevice && Network.Connection) {
      return Network.Connection !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if (this.onDevice && Network.Connection) {
      return Network.Connection === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }
}
