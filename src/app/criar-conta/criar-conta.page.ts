import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {
  public userRegister: User = {};
  private loading: any;

  constructor(private loadingController: LoadingController, private toastController: ToastController, private authService: AuthService) { }

  ngOnInit() {
  }

  async register(){
    await this.presentLoading();
    try{
      await this.authService.register(this.userRegister);
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
