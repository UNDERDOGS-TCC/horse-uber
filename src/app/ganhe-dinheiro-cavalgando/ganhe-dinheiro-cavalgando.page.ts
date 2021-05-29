import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ganhe-dinheiro-cavalgando',
  templateUrl: './ganhe-dinheiro-cavalgando.page.html',
  styleUrls: ['./ganhe-dinheiro-cavalgando.page.scss'],
})
export class GanheDinheiroCavalgandoPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmação',
      subHeader: 'Obrigado por usar Horse Uber',
      message: 'Seus dados foram recebidos! Dentro de 15 dias você receberá uma confirmação no email fornecido.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
