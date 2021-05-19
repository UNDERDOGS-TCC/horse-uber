import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): Promise<boolean>{
    return new Promise(resolver=>{
      this.authService.getAuth().onAuthStateChanged(user=>{
        if(user) this.router.navigate(['make-a-ride']);

        resolver(!user ? true : false);
      });
    });
  }
}
