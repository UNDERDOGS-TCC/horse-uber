import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { User } from '../interfaces/user';
import { UserData } from '../interfaces/userData';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {
  public userRegister: User = {};
  public name: string; public lastName: string; public pictureUrl: string;
  private loading: any;

  constructor(private loadingController: LoadingController, private toastController: ToastController, private authService: AuthService) { }

  ngOnInit() {
  }

  async register(){
    await this.presentLoading();
    try{
      await this.authService.register(this.userRegister);

      const userID = firebase.default.auth().currentUser.uid;
      const ourDataBase = firebase.default.database().ref('users');

      const userData = {
        uid: userID.toString(),
        userName: this.name.trim() + ' ' + this.lastName.trim(),
        userBalance: '0.00',
        userStars: '0.00',
        userPictureUrl: this.pictureUrl.toString(),
      } as UserData;
    ourDataBase.push(userData).toJSON();

    }catch(error){
      this.presentToast(error.message);
    }finally{
      this.loading.dismiss();
    }
  }

  async presentLoading(){
    this.loading = await this.loadingController.create({message: 'aguarde...',});
    return this.loading.present();
  }
  async presentToast(message: string){
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
