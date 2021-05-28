import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { AngularFireStorageModule } from '@angular/fire/storage';

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
      
      let message: string;
      switch(error.code){
        case 'auth/email-already-in-use':
        message = 'O endereço de e-mail já está sendo usado por outra conta.';
        break;
        case 'auth/weak-password':
        message = 'A senha deve ter 6 caracteres ou mais.';
        break;
      }

      this.presentToast(message);
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
