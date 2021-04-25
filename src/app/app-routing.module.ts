import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'tela-login',
    pathMatch: 'full'
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'make-a-ride',
    loadChildren: () => import('./make-a-ride/make-a-ride.module').then( m => m.MakeARidePageModule)
  },
  {
    path: 'tela-login',
    loadChildren: () => import('./tela-login/tela-login.module').then( m => m.TelaLoginPageModule)
  },
  {
    path: 'criar-conta',
    loadChildren: () => import('./criar-conta/criar-conta.module').then( m => m.CriarContaPageModule)
  },
  {
    path: 'your-trips',
    loadChildren: () => import('./your-trips/your-trips.module').then( m => m.YourTripsPageModule)
  },  {
    path: 'ganhe-dinheiro-cavalgando',
    loadChildren: () => import('./ganhe-dinheiro-cavalgando/ganhe-dinheiro-cavalgando.module').then( m => m.GanheDinheiroCavalgandoPageModule)
  },
  {
    path: 'mensagens',
    loadChildren: () => import('./mensagens/mensagens.module').then( m => m.MensagensPageModule)
  },
  {
    path: 'ajuda',
    loadChildren: () => import('./ajuda/ajuda.module').then( m => m.AjudaPageModule)
  },
  {
    path: 'configuracoes',
    loadChildren: () => import('./configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)
  },
  {
    path: 'ride',
    loadChildren: () => import('./ride/ride.module').then( m => m.RidePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
