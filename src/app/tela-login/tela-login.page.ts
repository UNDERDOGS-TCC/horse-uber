import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.page.html',
  styleUrls: ['./tela-login.page.scss'],
})
export class TelaLoginPage implements OnInit {
  public userLogin: User = {};
  private loading: any;

  constructor(private loadingController: LoadingController, private toastController: ToastController, private authService: AuthService) { }

  ngOnInit() {
  }

  async login(){
    await this.presentLoading();
    try{
      await this.authService.login(this.userLogin);
    }catch(error){

      let message: string;
      switch(error.code){
        case 'auth/user-not-found':
        message = 'Não há registro de usuário correspondente a este identificador. O usuário pode ter sido excluído.';
        break;
        case 'auth/wrong-password':
        message = 'A senha é inválida ou o usuário não possui uma senha.';
        break;
        case 'auth/invalid-email':
        message = 'O endereço de e-mail está formatado incorretamente.';
        break;
        case 'auth/email-already-in-use':
        message = 'O endereço de e-mail já está sendo usado por outra conta.';
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
